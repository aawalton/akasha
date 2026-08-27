import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { type QueryRow } from "../../../../shared/pages-query/src/answer-schema"
import { parseRuleMatch, type RuleCondition } from "./wording"

const CATEGORY = "monarch-category"
const TRANSACTION = "monarch-transaction"
const RULE = "category-rule-code"

const WHOLE_SET = 1000

export interface CategoryRow {
  readonly slug: string
  readonly name: string
  readonly groupName: string | null
}

export interface CategoryProvenance {
  readonly source: string
  readonly decidedBy: string | null
}

export interface TransactionRow {
  readonly id: string
  readonly title: string
  readonly date: string | null
  readonly amount: number | null
  readonly notes: string | null
  readonly isPending: boolean
  readonly categoryName: string | null
  readonly merchantName: string | null
  readonly accountName: string | null
  readonly categoryProvenance: CategoryProvenance | null
}

export interface RuleRow {
  readonly slug: string
  readonly name: string
  readonly conditions: readonly RuleCondition[]
  readonly categoryName: string | null
  readonly reserveForPerson: boolean
}

type Answered = {
  readonly rows: readonly QueryRow[]
  readonly total: number
}

async function ask(query: ComposedQuery): Promise<Answered> {
  const asked = await askComposed(query)
  if (!asked.ok) {
    throw new Error(
      `reading \`${query["page-type"]}\` from its files came back unanswered, so this page holds nothing to show: ${asked.why}`
    )
  }
  return { rows: asked.answer.rows, total: asked.answer.n }
}

function text(row: QueryRow, key: string): string | null {
  const value = row.values[key]
  if (value === null || value === undefined) return null
  const written = typeof value === "string" ? value : String(value)
  return written === "" ? null : written
}

function decimal(row: QueryRow, key: string): number | null {
  const written = text(row, key)
  if (written === null) return null
  const parsed = Number(written)
  return Number.isFinite(parsed) ? parsed : null
}

function flag(row: QueryRow, key: string): boolean {
  return text(row, key) === "true"
}

function fileSlug(row: QueryRow): string {
  const at = row.at ?? ""
  const file = at.slice(at.lastIndexOf("/") + 1)
  return file.endsWith(".md") ? file.slice(0, -".md".length) : file
}

async function categoryNamesBySlug(): Promise<ReadonlyMap<string, string>> {
  const { rows } = await ask({
    "page-type": CATEGORY,
    limit: WHOLE_SET,
    keys: ["slug", "title"],
  })
  return new Map(rows.map((row) => [text(row, "slug") ?? fileSlug(row), text(row, "title") ?? ""]))
}

export async function listCategories(): Promise<readonly CategoryRow[]> {
  const { rows } = await ask({
    "page-type": CATEGORY,
    "sort-by": "title",
    limit: WHOLE_SET,
    keys: ["slug", "title", "group-name", "monarch-id"],
  })
  return rows
    .filter((row) => text(row, "monarch-id") !== null)
    .map((row) => ({
      slug: text(row, "slug") ?? fileSlug(row),
      name: text(row, "title") ?? "",
      groupName: text(row, "group-name"),
    }))
}

function provenanceOf(row: QueryRow): CategoryProvenance | null {
  const source = text(row, "category-source")
  if (source === null) return null
  return { source, decidedBy: text(row, "category-decided-by") }
}

export async function listTransactions(
  limit: number,
  offset: number
): Promise<readonly TransactionRow[]> {
  const [{ rows }, categories] = await Promise.all([
    ask({
      "page-type": TRANSACTION,
      "sort-by": "date",
      descending: true,
      limit,
      offset,
      keys: [
        "monarch-id",
        "date",
        "amount",
        "merchant",
        "account",
        "category-slug",
        "notes",
        "pending",
        "category-source",
        "category-decided-by",
      ],
    }),
    categoryNamesBySlug(),
  ])

  return rows.map((row) => {
    const categorySlug = text(row, "category-slug")
    const merchant = text(row, "merchant")
    return {
      id: text(row, "monarch-id") ?? row.at ?? "",
      title: merchant ?? "",
      date: text(row, "date"),
      amount: decimal(row, "amount"),
      notes: text(row, "notes"),
      isPending: flag(row, "pending"),
      categoryName: categorySlug === null ? null : (categories.get(categorySlug) ?? null),
      merchantName: merchant,
      accountName: text(row, "account"),
      categoryProvenance: provenanceOf(row),
    }
  })
}

export async function listRules(): Promise<readonly RuleRow[]> {
  const { rows } = await ask({
    "page-type": RULE,
    "sort-by": "title",
    limit: WHOLE_SET,
    keys: ["title", "body", "category"],
  })
  return rows.map((row) => {
    const categoryName = text(row, "category")
    return {
      slug: fileSlug(row),
      name: text(row, "title") ?? "",
      conditions: parseRuleMatch(text(row, "body") ?? ""),
      categoryName,
      reserveForPerson: categoryName === null,
    }
  })
}

export async function countTransactions(): Promise<number> {
  const { total } = await ask({
    "page-type": TRANSACTION,
    limit: 1,
    keys: ["monarch-id"],
  })
  return total
}
