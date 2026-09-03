#!/usr/bin/env bun

import { setCategory } from "./categorize.ts"
import { monarchHeaders } from "./credential.ts"
import { categoryPages, keyOf, readAllTransactions } from "./files.ts"
import { transferBudget } from "./transaction-create.ts"

const CASH_ACCOUNT_ID = "151732808422660966"
const AUDIBLE_CATEGORY_ID = "251492769795545969"
const MERCHANT = "Audible Credit Transfer"
const DECIDED_BY = "Audible budget scheme, migration of history from 2025-01-01"
const FROM_DATE = "2025-01-01"

type Action = "transfer" | "recategorize-only" | "done"

interface Charge {
  readonly monarchId: string
  readonly date: string
  readonly amount: number
  readonly categoryId: string
  readonly categoryName: string
  readonly notes: string
}

function names(text: string | undefined): boolean {
  return (text ?? "").toLowerCase().includes("audible")
}

export async function audibleCharges(): Promise<readonly Charge[]> {
  const monarchIds = new Map<string, string>()
  const titles = new Map<string, string>()
  for (const page of await categoryPages()) {
    const id = keyOf(page, "monarchId")
    if (id !== null && id !== "") monarchIds.set(page.slug, id)
    titles.set(page.slug, page.title)
  }
  const held: Charge[] = []
  for (const line of await readAllTransactions()) {
    if (line.transactionDay < FROM_DATE) continue
    if ((line.merchant ?? "") === MERCHANT) continue
    if (!names(line.merchant) && !names(line.statementLine) && !names(line.transactionNote)) continue
    const slug = line.categorySlug
    held.push({
      monarchId: line.monarchId,
      date: line.transactionDay,
      amount: line.amount,
      categoryId: slug === undefined ? "" : (monarchIds.get(slug) ?? ""),
      categoryName: slug === undefined ? "" : (titles.get(slug) ?? slug),
      notes: line.transactionNote ?? "",
    })
  }
  return held.sort((one, other) => one.date.localeCompare(other.date))
}

export function actionFor(charge: Charge): Action {
  if (charge.categoryId === AUDIBLE_CATEGORY_ID) return "done"
  if (charge.amount > 0) return "recategorize-only"
  if (charge.categoryName === "Uncategorized") return "recategorize-only"
  if (/reim/i.test(charge.notes)) return "recategorize-only"
  return "transfer"
}

function describe(charge: Charge, action: Action): string {
  const amount = charge.amount.toFixed(2).padStart(9)
  return `${charge.date}  ${amount}  ${charge.categoryName.padEnd(18)} ${action}  ${charge.monarchId}`
}

function onlyIds(argv: readonly string[]): ReadonlySet<string> {
  const ids = new Set<string>()
  argv.forEach((arg, i) => {
    if (arg !== "--only") return
    const id = argv[i + 1]
    if (id === undefined) throw new Error("--only names a transaction monarch id")
    ids.add(id)
  })
  return ids
}

if (import.meta.main) {
  const write = process.argv.includes("--write")
  const named = onlyIds(process.argv.slice(2))
  const charges = await audibleCharges()
  const chosen = named.size === 0 ? charges : charges.filter((c) => named.has(c.monarchId))
  if (chosen.length !== named.size && named.size > 0) {
    throw new Error(
      `--only named ${named.size} transaction(s) and ${chosen.length} of them are in the population`
    )
  }
  const planned = chosen.map((charge) => ({ charge, action: actionFor(charge) }))
  for (const { charge, action } of planned) console.log(describe(charge, action))

  const transfers = planned.filter((p) => p.action === "transfer")
  const only = planned.filter((p) => p.action === "recategorize-only")
  const done = planned.filter((p) => p.action === "done")
  console.log(
    `\n${transfers.length} transfer + recategorize, ${only.length} recategorize only, ` +
      `${done.length} already done — ${transfers.length * 2} transactions to create on Cash`
  )
  if (!write) {
    console.log("nothing written — pass --write to make these changes")
    process.exit(0)
  }

  const auth = await monarchHeaders()
  for (const { charge, action } of planned) {
    if (action === "done") continue
    if (action === "transfer") {
      const [debit, credit] = await transferBudget(auth, {
        date: charge.date,
        accountId: CASH_ACCOUNT_ID,
        fromCategoryId: charge.categoryId,
        toCategoryId: AUDIBLE_CATEGORY_ID,
        amount: Math.abs(charge.amount),
        merchantName: MERCHANT,
      })
      console.log(`  ${charge.monarchId}: transferred ${charge.categoryName} -> Audible ${debit}/${credit}`)
    }
    await setCategory(charge.monarchId, AUDIBLE_CATEGORY_ID, {
      source: "manual-categorization",
      decidedBy: DECIDED_BY,
    })
    console.log(`  ${charge.monarchId}: category -> Audible`)
  }
}
