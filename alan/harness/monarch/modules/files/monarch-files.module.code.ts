import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { SHAPE } from "akasha/code/type/narrowing/modules/shape/shape.module.code.ts"
import {
  slugsOfType,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  AKASHA as AKASHA_REPO,
  resolveRoots,
  rootFor,
} from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const roots = resolveRoots()

export const AKASHA = rootFor(roots, AKASHA_REPO)

const MONTH_TYPE = "monarch-month"

const MONARCH = "alan/harness/monarch"

export const MONTHS_FOLDER = `${MONARCH}/month/pages`
export const HOLDING_FOLDER = `${MONARCH}/holding/pages`
export const CATEGORY_FOLDER = `${MONARCH}/category/pages`
export const ACCOUNT_FOLDER = `${MONARCH}/account/pages`
export const TAG_FOLDER = `${MONARCH}/tag/pages`

export type TransactionLine = {
  readonly id: string
  readonly monarchId: string
  readonly monarchUpdatedAt?: string
  readonly transactionDay: string
  readonly amount: number
  readonly statementLine?: string
  readonly merchant?: string
  readonly accountName?: string
  readonly account?: string
  readonly category?: string
  readonly categorySource?: string
  readonly categoryDecidedBy?: string
  readonly tags?: readonly string[]
  readonly transactionNote?: string
  readonly pending?: boolean
  readonly recurring?: boolean
  readonly split?: boolean
  readonly needsReview?: boolean
  readonly amazonOrderNumber?: string
}

const TRANSACTION_LINE = SHAPE.object({
  id: SHAPE.string(),
  monarchId: SHAPE.string(),
  monarchUpdatedAt: SHAPE.string().optional(),
  transactionDay: SHAPE.string(),
  amount: SHAPE.number(),
  statementLine: SHAPE.string().optional(),
  merchant: SHAPE.string().optional(),
  accountName: SHAPE.string().optional(),
  account: SHAPE.string().optional(),
  category: SHAPE.string().optional(),
  categorySource: SHAPE.string().optional(),
  categoryDecidedBy: SHAPE.string().optional(),
  tags: SHAPE.array(SHAPE.string()).optional(),
  transactionNote: SHAPE.string().optional(),
  pending: SHAPE.boolean().optional(),
  recurring: SHAPE.boolean().optional(),
  split: SHAPE.boolean().optional(),
  needsReview: SHAPE.boolean().optional(),
  amazonOrderNumber: SHAPE.string().optional(),
})

export function parseTransactionLine(line: string): TransactionLine {
  return TRANSACTION_LINE.parse(JSON.parse(line))
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

function pagesOfType(type: string): readonly PageFile[] {
  const found: PageFile[] = []
  for (const one of valuesOfType(AKASHA, type)) {
    const slug = one.value.slug
    if (typeof slug !== "string")
      throw new Error(`${one.path}: no \`slug\`, so nothing names this page`)
    const title = typeof one.value.title === "string" ? one.value.title : slug
    found.push({ slug, title, root: AKASHA, path: one.path, value: one.value })
  }
  return found
}

export function keyOf(page: PageFile, name: string): string | null {
  const held = page.value[name]
  if (typeof held === "string") return held
  if (typeof held === "number" || typeof held === "boolean") return String(held)
  return null
}

export async function categoryPages(): Promise<readonly PageFile[]> {
  return pagesOfType("monarch-category")
}

export async function accountPages(): Promise<readonly PageFile[]> {
  return pagesOfType("monarch-account")
}

export async function tagPages(): Promise<readonly PageFile[]> {
  return pagesOfType("monarch-tag")
}

export async function holdingPages(): Promise<readonly PageFile[]> {
  return pagesOfType("monarch-holding")
}

export function monthOf(date: string): string {
  return `month-${date.slice(0, 7)}`
}

export function monthPagePath(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}/${slug}.${MONTH_TYPE}.ts`
}

export function sidecarOf(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}/${slug}.${MONTH_TYPE}.transactions.jsonl`
}

export async function monthSlugs(): Promise<readonly string[]> {
  return slugsOfType(AKASHA, MONTH_TYPE)
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
        return parseTransactionLine(line)
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
