#!/usr/bin/env bun

import { monarchHeaders } from "./credential.ts"
import { categoryPages, keyOf } from "./files.ts"
import { createTransaction } from "./transaction-create.ts"

const CASH_ACCOUNT_ID = "151732808422660966"
const MERCHANT = "Audible Credit Transfer"
const DEFAULT_LIST = `${process.env.HOME ?? "."}/audible/rebuild.tsv`

interface BookTransfer {
  readonly label: string
  readonly fromCategory: string
  readonly date: string
  readonly title: string
  readonly amount: number
}

async function categoryIds(): Promise<ReadonlyMap<string, string>> {
  const held = new Map<string, string>()
  for (const page of await categoryPages()) {
    const id = keyOf(page, "monarchId")
    if (id !== null && id !== "") held.set(page.title, id)
  }
  if (held.size === 0) throw new Error("categoryIds: no category file carries a monarch id")
  return held
}

function categoryId(ids: ReadonlyMap<string, string>, name: string): string {
  const found = ids.get(name)
  if (found === undefined) throw new Error(`no category file is titled "${name}"`)
  return found
}

export function readList(text: string): readonly BookTransfer[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
  return lines.slice(1).map((line, i) => {
    const [label, fromCategory, date, title, amount] = line.split("\t")
    if (
      label === undefined ||
      fromCategory === undefined ||
      date === undefined ||
      title === undefined ||
      amount === undefined
    ) {
      throw new Error(`line ${i + 2} wants label/fromCategory/date/title/amount: ${line}`)
    }
    const value = Number(amount)
    if (!Number.isFinite(value) || value <= 0) {
      throw new Error(`line ${i + 2} names an amount that is not a positive number: ${amount}`)
    }
    return { label, fromCategory, date, title, amount: value }
  })
}

function flag(name: string): string | undefined {
  const at = process.argv.indexOf(`--${name}`)
  return at === -1 ? undefined : process.argv[at + 1]
}

if (import.meta.main) {
  const write = process.argv.includes("--write")
  const only = flag("only")
  const listPath = flag("list") ?? DEFAULT_LIST
  const all = readList(await Bun.file(listPath).text())
  const chosen = only === undefined ? all : all.filter((b) => b.title.includes(only))
  if (chosen.length === 0) throw new Error(`nothing in ${listPath} matches --only "${String(only)}"`)
  const ids = await categoryIds()
  const audible = categoryId(ids, "Audible")

  for (const b of chosen) {
    console.log(
      `${b.date}  ${b.label.padEnd(10)} ${b.title.slice(0, 44).padEnd(46)} ` +
        `${b.fromCategory} -${b.amount.toFixed(2)}`
    )
  }
  const total = chosen.reduce((sum, b) => sum + b.amount, 0)
  console.log(`\n${chosen.length} book(s), $${total.toFixed(2)} into Audible — ${chosen.length * 2} rows`)
  if (!write) {
    console.log("nothing written — pass --write to make these changes")
    process.exit(0)
  }

  const auth = await monarchHeaders()
  for (const b of chosen) {
    const notes = `${b.label} — ${b.title} (${b.date})`
    const common = { date: b.date, accountId: CASH_ACCOUNT_ID, merchantName: MERCHANT, notes }
    const debit = await createTransaction(auth, {
      ...common,
      categoryId: categoryId(ids, b.fromCategory),
      amount: -b.amount,
    })
    const credit = await createTransaction(auth, { ...common, categoryId: audible, amount: b.amount })
    console.log(`  ${b.date} ${notes} -> ${debit}/${credit}`)
  }
}
