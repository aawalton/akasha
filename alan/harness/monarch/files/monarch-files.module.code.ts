import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { AKASHA as AKASHA_REPO, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { type Value, valueAt } from "@akasha/pages-system/page-value"

const roots = resolveRoots()

export const AKASHA = rootFor(roots, AKASHA_REPO)

const MONTH_TYPE = "monarch-month"

/** Every Monarch page family stands under this one folder inside akasha. */
const MONARCH = "alan/harness/monarch"

export const MONTHS_FOLDER = `${MONARCH}/monarch-months/pages`
export const HOLDING_FOLDER = `${MONARCH}/monarch-holdings/pages`
export const CATEGORY_FOLDER = `${MONARCH}/monarch-categories/pages`
export const ACCOUNT_FOLDER = `${MONARCH}/monarch-accounts/pages`
export const TAG_FOLDER = `${MONARCH}/monarch-tags/pages`
export const DIRECTION_FOLDER = `${MONARCH}/monarch-directions/pages`
export const MERCHANT_FOLDER = `${MONARCH}/monarch-merchants/pages`

/**
 * One line of the `transactions` entry file standing beside a month page.
 *
 * The keys are the entry shape's own, declared at
 * `alan/harness/monarch/monarch-months/properties/transactions.page-property-entry.ts`.
 * They are camel because a page property is read by its key rather than by its slug.
 */
export interface TransactionLine {
  readonly id: string
  readonly monarchId: string
  readonly monarchUpdatedAt?: string
  readonly transactionDay: string
  readonly amount: number
  readonly statementLine?: string
  readonly merchant?: string
  readonly accountName?: string
  readonly accountSlug?: string
  readonly categorySlug?: string
  readonly categorySource?: string
  readonly categoryDecidedBy?: string
  readonly tagSlugs?: readonly string[]
  readonly transactionNote?: string
  readonly pending?: boolean
  readonly recurring?: boolean
  readonly split?: boolean
  readonly needsReview?: boolean
  readonly amazonOrderNumber?: string
}

export interface MonthPage {
  readonly slug: string
  readonly path: string
  readonly sidecar: string
  readonly transactions: readonly TransactionLine[]
}

export interface PageFile {
  readonly slug: string
  readonly title: string
  readonly root: string
  readonly path: string
  readonly value: Value
}

function pageNamesIn(names: readonly string[], type: string): readonly string[] {
  return names.filter((name) => name.endsWith(`.${type}.ts`)).sort()
}

async function pagesIn(root: string, folder: string, type: string): Promise<readonly PageFile[]> {
  const names = pageNamesIn(await readdir(join(root, folder)), type)
  const found: PageFile[] = []
  for (const name of names) {
    const path = `${folder}/${name}`
    const value = valueAt(path, root)
    if (value === null) throw new Error(`${path}: no page value, so nothing names this page`)
    const slug = value.slug
    if (typeof slug !== "string")
      throw new Error(`${path}: no \`slug\`, so nothing names this page`)
    const title = typeof value.title === "string" ? value.title : slug
    found.push({ slug, title, root, path, value })
  }
  return found
}

/** Read one of a page's values as text. The name is the property's key, in camel. */
export function keyOf(page: PageFile, name: string): string | null {
  const held = page.value[name]
  if (typeof held === "string") return held
  if (typeof held === "number" || typeof held === "boolean") return String(held)
  return null
}

export async function categoryPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, CATEGORY_FOLDER, "monarch-category")
}

export async function accountPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, ACCOUNT_FOLDER, "monarch-account")
}

export async function tagPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, TAG_FOLDER, "monarch-tag")
}

export async function holdingPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, HOLDING_FOLDER, "monarch-holding")
}

export async function directionPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, DIRECTION_FOLDER, "monarch-direction")
}

export async function merchantPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, MERCHANT_FOLDER, "monarch-merchant")
}

/** The slug of the month a day falls in. A month page is slugged `month-` ahead of the month. */
export function monthOf(date: string): string {
  return `month-${date.slice(0, 7)}`
}

/** A month page stands in a folder of its own, the entry file beside it. */
export function monthPagePath(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}/${slug}.${MONTH_TYPE}.ts`
}

export function sidecarOf(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}/${slug}.${MONTH_TYPE}.transactions.jsonl`
}

export async function monthSlugs(): Promise<readonly string[]> {
  const entries = await readdir(join(AKASHA, MONTHS_FOLDER), { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
}

async function linesOf(slug: string): Promise<readonly TransactionLine[]> {
  let text: string
  try {
    text = await readFile(join(AKASHA, sidecarOf(slug)), "utf8")
  } catch {
    return []
  }
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line, i) => {
      try {
        return JSON.parse(line) as TransactionLine
      } catch {
        throw new Error(`${sidecarOf(slug)} line ${i + 1} is not one JSON object`)
      }
    })
}

export async function readMonths(slugs?: readonly string[]): Promise<readonly MonthPage[]> {
  const wanted = slugs ?? (await monthSlugs())
  const held: MonthPage[] = []
  for (const slug of wanted) {
    held.push({
      slug,
      path: monthPagePath(slug),
      sidecar: sidecarOf(slug),
      transactions: await linesOf(slug),
    })
  }
  return held
}

export async function readTransactionsBetween(
  from: string,
  to: string
): Promise<readonly TransactionLine[]> {
  const slugs = (await monthSlugs()).filter((slug) => slug >= monthOf(from) && slug <= monthOf(to))
  const held: TransactionLine[] = []
  for (const month of await readMonths(slugs)) {
    for (const line of month.transactions) {
      if (line.transactionDay >= from && line.transactionDay <= to) held.push(line)
    }
  }
  return held.sort((one, other) => one.transactionDay.localeCompare(other.transactionDay))
}

export async function readAllTransactions(): Promise<readonly TransactionLine[]> {
  const held: TransactionLine[] = []
  for (const month of await readMonths()) held.push(...month.transactions)
  return held
}

export interface PlacedLine {
  readonly month: string
  readonly line: TransactionLine
}

export async function findTransaction(monarchId: string): Promise<PlacedLine | null> {
  for (const month of await readMonths()) {
    const line = month.transactions.find((one) => one.monarchId === monarchId)
    if (line !== undefined) return { month: month.slug, line }
  }
  return null
}

export async function transactionsById(
  ids: ReadonlySet<string>
): Promise<ReadonlyMap<string, PlacedLine>> {
  const held = new Map<string, PlacedLine>()
  for (const month of await readMonths()) {
    for (const line of month.transactions) {
      if (ids.has(line.monarchId)) held.set(line.monarchId, { month: month.slug, line })
    }
  }
  return held
}
