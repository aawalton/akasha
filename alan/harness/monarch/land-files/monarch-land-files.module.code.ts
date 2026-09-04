import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { landedMechanically } from "@akasha/command-system/asking"
import { AKASHA as AKASHA_REPO } from "@akasha/pages-system/checkout-roots"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import type { MonarchTransaction } from "../client/monarch-client.module.code.ts"
import type { PageFile, TransactionLine } from "../files/monarch-files.module.code.ts"
import {
  AKASHA,
  accountPages,
  categoryPages,
  keyOf,
  monthOf,
  monthPagePath,
  monthSlugs,
  sidecarOf,
  tagPages,
} from "../files/monarch-files.module.code.ts"

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export interface WriteItem {
  readonly file_path: string
  readonly content: string
}

async function byMonarchId(
  pages: () => Promise<readonly PageFile[]>
): Promise<ReadonlyMap<string, string>> {
  const held = new Map<string, string>()
  for (const page of await pages()) {
    const id = keyOf(page, "monarchId")
    if (id !== null && id !== "") held.set(id, page.slug)
  }
  return held
}

export interface SlugMaps {
  readonly accounts: ReadonlyMap<string, string>
  readonly accountNames: ReadonlyMap<string, string>
  readonly categories: ReadonlyMap<string, string>
  readonly tags: ReadonlyMap<string, string>
}

export async function slugMaps(): Promise<SlugMaps> {
  const accountNames = new Map<string, string>()
  for (const page of await accountPages()) {
    const id = keyOf(page, "monarchId")
    if (id !== null) accountNames.set(id, keyOf(page, "accountDisplayName") ?? page.title)
  }
  return {
    accounts: await byMonarchId(accountPages),
    accountNames,
    categories: await byMonarchId(categoryPages),
    tags: await byMonarchId(tagPages),
  }
}

function raw(t: MonarchTransaction, name: string): string | null {
  const held = t.raw
  if (held === null || typeof held !== "object") return null
  const value = (held as Record<string, unknown>)[name]
  return typeof value === "string" && value !== "" ? value : null
}

export function lineOf(t: MonarchTransaction, maps: SlugMaps): TransactionLine | null {
  if (t.account === null) return null
  const accountSlug = maps.accounts.get(t.account.id)
  if (accountSlug === undefined) return null
  const line: Record<string, unknown> = {
    id: Bun.randomUUIDv7(),
    monarchId: t.id,
    monarchUpdatedAt: raw(t, "updatedAt"),
    transactionDay: t.date,
    amount: t.amount,
    statementLine: raw(t, "plaidName"),
    merchant: t.merchant?.name ?? null,
    accountName: maps.accountNames.get(t.account.id) ?? t.account.name,
    accountSlug,
    categorySlug: t.category === null ? null : (maps.categories.get(t.category.id) ?? null),
    tagSlugs: t.tags.flatMap((tag) => {
      const slug = maps.tags.get(tag.id)
      return slug === undefined ? [] : [slug]
    }),
    transactionNote: t.notes,
    pending: t.pending || null,
    recurring: t.isRecurring || null,
    split: t.isSplitTransaction || null,
    needsReview: t.needsReview || null,
  }
  const held: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(line)) {
    if (value === null || value === undefined) continue
    if (Array.isArray(value) && value.length === 0) continue
    held[key] = value
  }
  return held as unknown as TransactionLine
}

async function existing(slug: string): Promise<readonly TransactionLine[]> {
  try {
    const text = await readFile(join(AKASHA, sidecarOf(slug)), "utf8")
    return text
      .split("\n")
      .filter((one) => one.trim() !== "")
      .map((one) => JSON.parse(one) as TransactionLine)
  } catch {
    return []
  }
}

/**
 * A month page is a TypeScript page standing in a folder of its own, the transactions entry file
 * beside it. The slug opens `month-` ahead of the year and month, which is where the dates below
 * are cut from.
 */
function monthPage(slug: string): string {
  const covered = slug.slice("month-".length)
  const year = Number.parseInt(covered.slice(0, 4), 10)
  const name = `${MONTH_NAMES[Number.parseInt(covered.slice(5, 7), 10) - 1]} ${year}`
  return [
    `import type { MonarchMonth } from "../../monarch-month.page-type.ts"`,
    "",
    `export const ${exportedAs(slug)} = {`,
    `  id: "${Bun.randomUUIDv7()}",`,
    `  pageTypeSlug: "monarch-month",`,
    `  slug: "${slug}",`,
    `  title: ${JSON.stringify(name)},`,
    `  startsOn: "${covered}-01",`,
    `  transactions: "jsonl",`,
    `} as const satisfies MonarchMonth`,
    "",
  ].join("\n")
}

export const ARRIVED_FROM_MONARCH = "monarch"

function carried(standing: TransactionLine, arriving: TransactionLine): TransactionLine {
  const held: Record<string, unknown> = { ...arriving, id: standing.id }
  const order = standing.amazonOrderNumber
  if (order !== undefined) held.amazonOrderNumber = order

  const stands = standing.categorySlug
  const source = standing.categorySource
  const by = standing.categoryDecidedBy
  const landing = arriving.categorySlug
  const ours = source !== undefined && source !== ARRIVED_FROM_MONARCH

  if (landing === stands || (ours && landing !== stands)) {
    if (stands !== undefined) held.categorySlug = stands
    else delete held.categorySlug
    if (source !== undefined) held.categorySource = source
    if (by !== undefined) held.categoryDecidedBy = by
  } else if (landing !== undefined) {
    held.categorySource = ARRIVED_FROM_MONARCH
    delete held.categoryDecidedBy
  }
  return held as unknown as TransactionLine
}

function sortLines(lines: readonly TransactionLine[]): readonly TransactionLine[] {
  return [...lines].sort(
    (one, other) =>
      one.transactionDay.localeCompare(other.transactionDay) ||
      one.monarchId.localeCompare(other.monarchId)
  )
}

export function merged(
  standing: readonly TransactionLine[],
  arriving: readonly TransactionLine[],
  retiring: ReadonlySet<string>
): { readonly lines: readonly TransactionLine[]; readonly held: readonly string[] } {
  const kept = new Map<string, TransactionLine>()
  for (const line of standing) kept.set(line.monarchId, line)
  const held: string[] = []
  for (const line of arriving) {
    const id = line.monarchId
    const before = kept.get(id)
    if (before === undefined) {
      kept.set(
        id,
        line.categorySlug === undefined
          ? line
          : ({ ...line, categorySource: ARRIVED_FROM_MONARCH } as TransactionLine)
      )
      continue
    }
    const after = carried(before, line)
    if (before.categorySlug !== line.categorySlug && after.categorySlug === before.categorySlug) {
      held.push(`${id} (${String(before.categorySource)})`)
    }
    kept.set(id, after)
  }
  for (const id of retiring) kept.delete(id)
  return { lines: sortLines([...kept.values()]), held }
}

/**
 * The keys an entry states, in the order the entry shape declares them, at
 * `alan/harness/monarch/monarch-months/properties/transactions.page-property-entry.ts`.
 * A line is written in this order however it was built, so a resync that changes nothing
 * rewrites nothing.
 */
const ENTRY_KEYS = [
  "id",
  "monarchId",
  "monarchUpdatedAt",
  "transactionDay",
  "amount",
  "merchant",
  "accountName",
  "accountSlug",
  "categorySlug",
  "statementLine",
  "transactionNote",
  "categorySource",
  "categoryDecidedBy",
  "amazonOrderNumber",
  "tagSlugs",
  "split",
  "recurring",
  "needsReview",
  "pending",
]

function lineText(line: TransactionLine): string {
  const held = line as unknown as Record<string, unknown>
  const said: Record<string, unknown> = {}
  for (const key of ENTRY_KEYS) if (key in held) said[key] = held[key]
  for (const key of Object.keys(held)) if (!(key in said)) said[key] = held[key]
  return JSON.stringify(said)
}

function sidecarText(lines: readonly TransactionLine[]): string {
  return lines.map((row) => lineText(row)).join("\n") + (lines.length > 0 ? "\n" : "")
}

export type LinePatch = Readonly<Record<string, unknown>>

export async function patchTransactionLines(
  patches: ReadonlyMap<string, LinePatch>,
  message: string
): Promise<readonly string[]> {
  if (patches.size === 0) return []
  const items: WriteItem[] = []
  const touched: string[] = []
  const unfound = new Set(patches.keys())
  for (const month of await monthSlugs()) {
    const standing = await existing(month)
    let changed = false
    const lines = standing.map((line) => {
      const patch = patches.get(line.monarchId)
      if (patch === undefined) return line
      unfound.delete(line.monarchId)
      const held: Record<string, unknown> = { ...line }
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === undefined) delete held[key]
        else held[key] = value
      }
      if (JSON.stringify(held) !== JSON.stringify(line)) changed = true
      return held as unknown as TransactionLine
    })
    if (!changed) continue
    touched.push(month)
    items.push({ file_path: sidecarOf(month), content: sidecarText(sortLines(lines)) })
  }
  if (unfound.size > 0) {
    throw new Error(
      `no month sidecar carries transaction(s) ${[...unfound].join(", ")}, so nothing was written`
    )
  }
  if (items.length === 0) return []
  await through(items, message)
  return touched.sort()
}

export const WRITER = "monarch-writer"

/**
 * This lands the month files, and it reads nothing first.
 *
 * It used to read each file already on disk before writing it, so that the old read-record gate
 * would let the write through. That gate went at `220d57c4a8`, "nothing writes the old read record
 * any more", and the read went with it: `read` is no longer a command `ops` carries, so the call
 * refused every minute and the poll landed nothing for as long as it did.
 *
 * Nothing is put back in its place. A daemon has no read record and can never have one, which
 * `tools/lib/tracking/akasha-day.ts` states for the day funnel: its `AGENT_ID` names no seat, and
 * where one is fabricated the record it builds is invalidated by its own write, the file it is
 * about to write being among the ones the warrant asks it to have read. These bodies are composed
 * by a program rather than authored, which is what landing mechanically below says, and a
 * composed body owes no reading.
 */
export function through(items: readonly WriteItem[], message: string): Promise<void> {
  const encoder = new TextEncoder()
  const said = landedMechanically(
    AKASHA,
    WRITER,
    items.map((item) => ({ path: item.file_path, body: encoder.encode(item.content) })),
    message
  )
  if (said.code !== 0) {
    const why = said.refusals.length > 0 ? said.refusals.join("\n") : said.report.join("\n")
    throw new Error(`landing the ${AKASHA_REPO} files was refused:\n${why}`)
  }
  return Promise.resolve()
}

export async function landTransactionFiles(
  arriving: readonly TransactionLine[],
  retiring: readonly string[] = []
): Promise<readonly string[]> {
  const gone = new Set(retiring)
  const touched = new Map<string, TransactionLine[]>()
  for (const line of arriving) {
    const month = monthOf(line.transactionDay)
    const held = touched.get(month) ?? []
    held.push(line)
    touched.set(month, held)
  }
  if (gone.size > 0) {
    for (const month of await monthSlugs()) {
      if (touched.has(month)) continue
      const standing = await existing(month)
      if (standing.some((line) => gone.has(line.monarchId))) touched.set(month, [])
    }
  }
  if (touched.size === 0) return []

  const items: WriteItem[] = []
  const held: string[] = []
  for (const [month, lines] of [...touched.entries()].sort()) {
    const standing = await existing(month)
    if (standing.length === 0) {
      items.push({ file_path: monthPagePath(month), content: monthPage(month) })
    }
    const rows = merged(standing, lines, gone)
    held.push(...rows.held)
    items.push({ file_path: sidecarOf(month), content: sidecarText(rows.lines) })
  }
  if (held.length > 0) {
    console.warn(
      `  held ${held.length} category decision(s) of ours against Monarch: ${held.join(", ")}`
    )
  }
  await through(items, `monarch: ${arriving.length} transaction(s) landed from the poller`)
  return [...touched.keys()].sort()
}

export interface Held {
  readonly lines: readonly TransactionLine[]
  readonly skipped: number
  readonly unknownTags: readonly string[]
}

export function linesFrom(transactions: readonly MonarchTransaction[], maps: SlugMaps): Held {
  const lines: TransactionLine[] = []
  const unknownTags = new Set<string>()
  let skipped = 0
  for (const t of transactions) {
    for (const tag of t.tags) if (!maps.tags.has(tag.id)) unknownTags.add(tag.name)
    const line = lineOf(t, maps)
    if (line === null) skipped += 1
    else lines.push(line)
  }
  return { lines, skipped, unknownTags: [...unknownTags] }
}

export async function linesFor(transactions: readonly MonarchTransaction[]): Promise<Held> {
  return linesFrom(transactions, await slugMaps())
}
