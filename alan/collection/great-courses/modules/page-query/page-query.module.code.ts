import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"

const CEILING = 20_000

type QueryRow = {
  readonly values: Readonly<Record<string, unknown>>
}

type Titled = QueryRow & { readonly read: string | undefined }

export async function everyRow(
  pageTypeSlug: string,
  keys: readonly string[]
): Promise<readonly QueryRow[]> {
  const asked = await askComposed({ "page-type": pageTypeSlug, keys, limit: CEILING })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` went unread: ${asked.why}`)
  const { n, rows } = asked.answer
  if (rows.length !== n) {
    throw new Error(
      `\`${pageTypeSlug}\` answered with ${rows.length} of ${n} page(s), so this is a truncated ` +
        `population rather than the whole one, and nothing may be decided against it`
    )
  }
  return rows
}

export async function pageTitled(
  pageTypeSlug: string,
  title: string,
  keys: readonly string[]
): Promise<Titled | null> {
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    where: { title: { is: title } },
    keys: [...keys, "slug"],
  })
  if (!asked.ok) throw new Error(`\`${pageTypeSlug}\` titled "${title}" went unread: ${asked.why}`)
  const row = asked.answer.rows[0]
  return row === undefined ? null : { ...row, read: asked.answer.at }
}

export function textAt(row: QueryRow, key: string): string | null {
  const held = row.values[key]
  if (typeof held === "string") return held === "" ? null : held
  if (typeof held === "number") return String(held)
  return null
}
