
import { readFile, readdir } from "node:fs/promises"
import { join } from "node:path"
import { parse } from "../page/document/parse.ts"
import type { Document } from "../page/document/types.ts"
import { AKASHA as AKASHA_REPO, resolveRoots, rootFor } from "../repo/roots/roots"
import { pageStemOf } from "../page/name/name"
import { placeDirOf } from "../page/page-types.ts"

const roots = resolveRoots()

export const AKASHA = rootFor(roots, AKASHA_REPO)

const MONTH_TYPE = "monarch-month"

export const MONTHS_FOLDER = placeDirOf(MONTH_TYPE)
export const HOLDING_FOLDER = placeDirOf("monarch-holding")
export const CATEGORY_FOLDER = placeDirOf("monarch-category")
export const ACCOUNT_FOLDER = placeDirOf("monarch-account")
export const TAG_FOLDER = placeDirOf("monarch-tag")
export const DIRECTION_FOLDER = placeDirOf("monarch-direction")

export interface TransactionLine {
  readonly id: string
  readonly "monarch-id": string
  readonly "updated-at"?: string
  readonly date: string
  readonly amount: number
  readonly description?: string
  readonly merchant?: string
  readonly account?: string
  readonly "account-slug"?: string
  readonly "category-slug"?: string
  readonly "category-source"?: string
  readonly "category-decided-by"?: string
  readonly "tag-slugs"?: readonly string[]
  readonly notes?: string
  readonly pending?: boolean
  readonly recurring?: boolean
  readonly split?: boolean
  readonly "needs-review"?: boolean
  readonly "hide-from-reports"?: boolean
  readonly "amazon-order-number"?: string
}

export interface MonthPage {
  readonly slug: string
  readonly path: string
  readonly sidecar: string
  readonly transactions: readonly TransactionLine[]
}

function scalar(document: Document, name: string): string | null {
  const key = document.frontmatter.find((one) => one.name === name)
  if (key === undefined || key.value.kind !== "scalar") return null
  const text = key.value.value.text.trim()
  if (text.length >= 2 && text.startsWith('"') && text.endsWith('"')) {
    return text.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  }
  return text
}

export interface PageFile {
  readonly slug: string
  readonly title: string
  readonly root: string
  readonly path: string
  readonly document: Document
}

async function pagesIn(root: string, folder: string): Promise<readonly PageFile[]> {
  const names = (await readdir(join(root, folder))).filter((name) => name.endsWith(".md")).sort()
  const found: PageFile[] = []
  for (const name of names) {
    const path = `${folder}/${name}`
    const document = parse(await readFile(join(root, path), "utf8"), path)
    const slug = scalar(document, "slug")
    if (slug === null) throw new Error(`${path}: no \`slug\`, so nothing names this page`)
    found.push({ slug, title: scalar(document, "title") ?? slug, root, path, document })
  }
  return found
}

export function keyOf(page: PageFile, name: string): string | null {
  return scalar(page.document, name)
}

export async function categoryPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, CATEGORY_FOLDER)
}

export async function accountPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, ACCOUNT_FOLDER)
}

export async function tagPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, TAG_FOLDER)
}

export async function holdingPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, HOLDING_FOLDER)
}

export async function directionPages(): Promise<readonly PageFile[]> {
  return pagesIn(AKASHA, DIRECTION_FOLDER)
}

export function monthOf(date: string): string {
  return date.slice(0, 7)
}

export function monthPagePath(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}.${MONTH_TYPE}.md`
}

export function sidecarOf(slug: string): string {
  return `${MONTHS_FOLDER}/${slug}.${MONTH_TYPE}.transactions.jsonl`
}

export async function monthSlugs(): Promise<readonly string[]> {
  return (await readdir(join(AKASHA, MONTHS_FOLDER)))
    .filter((name) => name.endsWith(`.${MONTH_TYPE}.md`))
    .map((name) => pageStemOf(name))
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
  const slugs = (await monthSlugs()).filter(
    (slug) => slug >= monthOf(from) && slug <= monthOf(to)
  )
  const held: TransactionLine[] = []
  for (const month of await readMonths(slugs)) {
    for (const line of month.transactions) {
      if (line.date >= from && line.date <= to) held.push(line)
    }
  }
  return held.sort((one, other) => one.date.localeCompare(other.date))
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
    const line = month.transactions.find((one) => one["monarch-id"] === monarchId)
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
      if (ids.has(line["monarch-id"])) held.set(line["monarch-id"], { month: month.slug, line })
    }
  }
  return held
}
