import {
  type FileWriteDeps,
  LIVE,
  landed,
  type Naming,
  readBack,
  refuseTooMany,
  rowsMatching,
  slugForNew,
  slugsOf,
  valuesFor,
} from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { FileWriteError } from "akasha/page/access/modules/file-write-error/file-write-error.module.code.ts"
import { narrowedFrom } from "akasha/page/access/modules/file-write-narrow/file-write-narrow.module.code.ts"
import type { PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

const SLUG = "slug"

const NOTHING_WRITTEN = "Nothing has been written."

export type UpsertFilePagesArgs = {
  readonly pageTypeSlug: string
  readonly items: ReadonlyArray<{
    readonly where: PageWhere
    readonly set: Readonly<Record<string, unknown>>
    readonly clears?: readonly string[]
  }>
  readonly select?: PageSelect
  readonly writer?: string
}

type Named = { readonly key: string; readonly is: string }

function oneValueIn(where: PageWhere): Named | null {
  const narrowed = narrowedFrom(where)
  if ("refused" in narrowed) return null
  const only = Object.entries(narrowed.where)
  const first = only[0]
  if (only.length !== 1 || first === undefined) return null
  const [key, test] = first
  const said = (test as { readonly is?: unknown }).is
  if (Object.keys(test).length !== 1 || typeof said !== "string") return null
  return { key, is: said }
}

async function foundAlone(
  op: string,
  pageTypeSlug: string,
  where: PageWhere,
  deps: FileWriteDeps
): Promise<string | null> {
  const slugs = slugsOf(op, pageTypeSlug, await rowsMatching(op, pageTypeSlug, where, deps))
  if (slugs.length > 1) refuseTooMany(op, pageTypeSlug, slugs, NOTHING_WRITTEN)
  return slugs[0] ?? null
}

async function foundTogether(
  op: string,
  pageTypeSlug: string,
  key: string,
  asked: readonly Named[],
  deps: FileWriteDeps
): Promise<readonly (string | null)[]> {
  const answered = await deps.ask({
    pageTypeSlug,
    where: { [key]: { in: [...new Set(asked.map((one) => one.is))] } },
  })
  if ("refused" in answered) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): the pages this write would reach went unread — ${answered.refused}. ${NOTHING_WRITTEN}`
    )
  }
  const held = new Map<string, string[]>()
  for (const row of answered.rows) {
    const at = row[key]
    if (typeof at !== "string") continue
    for (const slug of slugsOf(op, pageTypeSlug, [row])) {
      held.set(at, [...(held.get(at) ?? []), slug])
    }
  }
  return asked.map((one) => {
    const slugs = held.get(one.is) ?? []
    if (slugs.length > 1) refuseTooMany(op, pageTypeSlug, slugs, NOTHING_WRITTEN)
    return slugs[0] ?? null
  })
}

async function foundFor(
  op: string,
  pageTypeSlug: string,
  wheres: readonly PageWhere[],
  deps: FileWriteDeps
): Promise<readonly (string | null)[]> {
  const asked = wheres.map((where) => oneValueIn(where))
  const key = asked[0]?.key
  const together: Named[] = []
  for (const one of asked) {
    if (one === null || one === undefined || one.key !== key) break
    together.push(one)
  }
  if (key !== undefined && together.length === asked.length) {
    return await foundTogether(op, pageTypeSlug, key, together, deps)
  }
  const out: (string | null)[] = []
  for (const where of wheres) out.push(await foundAlone(op, pageTypeSlug, where, deps))
  return out
}

export async function upsertFilePages(
  args: UpsertFilePagesArgs,
  op = "upsertPages",
  deps: FileWriteDeps = LIVE
): Promise<readonly Page[]> {
  if (args.items.length === 0) return []
  const found = await foundFor(
    op,
    args.pageTypeSlug,
    args.items.map((one) => one.where),
    deps
  )
  const pages: Naming[] = []
  const slugs: string[] = []
  args.items.forEach((item, at) => {
    const already = found[at] ?? null
    const slug = already ?? slugForNew(op, args.pageTypeSlug, undefined, item.set, item.where)
    const values = valuesFor(item.set)
    if (already === null) values[SLUG] = slug
    pages.push({
      pageTypeSlug: args.pageTypeSlug,
      slug,
      values,
      ...(already === null ? {} : { merge: true }),
      ...(already === null || item.clears === undefined ? {} : { clears: item.clears }),
    })
    slugs.push(slug)
  })
  await landed(op, args.pageTypeSlug, args.writer, pages, deps)
  const back = await readBack(op, args.pageTypeSlug, [...new Set(slugs)], deps)
  const by = new Map(back.map((one) => [String(one.slug), one]))
  return slugs.map((slug) => {
    const one = by.get(slug)
    if (one === undefined) {
      throw new FileWriteError(
        args.pageTypeSlug,
        `${op}(${args.pageTypeSlug}): \`${slug}\` was written and did not come back, so what is there went unread.`
      )
    }
    return one
  })
}
