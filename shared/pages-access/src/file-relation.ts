import {
  askComposed,
  askNaming,
  askPage,
  type NamingAsk,
  type NamingAsked,
} from "@shared/pages-query/ask"
import { z } from "zod"
import { fileRelationDeclarations } from "./file-property-defs"
import { type FileReadDeps, fileBackedPageTypes, isFileBacked, pageOf } from "./file-read"
import { buildRawPageRows, kebabizeKey } from "./file-rows"
import { fileShapeOf } from "./file-shape"
import { applySelect } from "./routing-core"
import type { PageSelect } from "./types"
import type { Page } from "@shared/pages-core/page-types"

const RPC_DEFAULT_LIMIT = 20_000

const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

const POINTS = /\brelation(-(?:slug|seq|id|name))?\b/

const SETTLED_BY_THE_ROW = "none"

export type FileRelationDeps = FileReadDeps & {
  readonly naming?: (ask: NamingAsk) => Promise<NamingAsked>
}

const LIVE: FileRelationDeps = {
  ask: (query) => askComposed(query),
  roster: fileBackedPageTypes,
}

export function slugNamed(text: string): string {
  const found = ADDRESS.exec(text)
  return found === null ? text : (found[2] as string)
}

export type RelationPoints = "id" | "seq" | "name"

export type RelationOnType = {
  readonly key: string
  readonly points: RelationPoints
  readonly targetSlug: string
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

const POINTS_CAPTURE = z.tuple([z.string(), z.string().optional()])

function pointsBy(type: string): RelationPoints | null {
  const found = POINTS_CAPTURE.safeParse(POINTS.exec(type))
  if (!found.success) return null
  return found.data[1] === "-id" ? "id" : found.data[1] === "-seq" ? "seq" : "name"
}

export async function relationsOn(
  pageTypeSlug: string,
  _deps: FileRelationDeps = LIVE
): Promise<ReadonlyMap<string, RelationOnType> | null> {
  const declared = await fileRelationDeclarations(pageTypeSlug)
  if (declared === null) return null
  const found = new Map<string, RelationOnType>()
  for (const one of declared) {
    if (one.targetSlug === null) continue
    const points = pointsBy(one.type)
    if (points === null) continue
    const spelling = kebabizeKey(one.key)
    if (found.has(spelling)) continue
    found.set(spelling, {
      key: one.key,
      points,
      targetSlug: one.targetSlug,
      slugProperty: one.slugProperty,
      mayBeGone: one.mayBeGone,
    })
  }
  return found
}

export function namesNothing(value: string): boolean {
  const named = value.trim()
  return named === "" || named === SETTLED_BY_THE_ROW
}

/**
 * WHETHER A NAMED PAGE STANDS, AND WHETHER ANYTHING LOOKED. `absent` is the corpus answering that
 * it holds no such page; `unasked` is nothing having read the corpus at all. Collapsed into one
 * boolean the two read alike, and a caller taking the second for the first tells its writer that
 * the name it gave stands under nothing, when what happened is that nobody looked.
 */
export type Standing =
  | { readonly outcome: "stands" }
  | { readonly outcome: "absent" }
  | { readonly outcome: "unasked"; readonly why: string }

export async function standsUnder(
  targetSlug: string,
  name: string,
  deps: FileRelationDeps = LIVE
): Promise<Standing> {
  const named = slugNamed(name)
  const page = await askPage(targetSlug, named)
  if (page.outcome === "found") return { outcome: "stands" }
  const asked = await deps.ask({
    "page-type": targetSlug,
    keys: ["slug"],
    where: { slug: { is: named } },
    limit: 1,
  })
  if (!asked.ok) {
    const first = page.outcome === "unasked" ? `${page.why}; and ` : ""
    return { outcome: "unasked", why: `${first}${asked.why}` }
  }
  if (asked.answer.rows.length > 0) return { outcome: "stands" }
  // THE SECOND ASK ANSWERS A NARROWER QUESTION THAN THE FIRST. It asks which pages carry `slug`,
  // where the first asked which page stands at that name, so no row here settles absence unless
  // the first was answered too.
  if (page.outcome === "unasked") return { outcome: "unasked", why: page.why }
  return { outcome: "absent" }
}

export type GetFilePagesByRelationArgs = {
  readonly relationKey: string
  readonly relationValue: string
  readonly pageTypeSlugs?: readonly string[]
  readonly select?: PageSelect
  readonly limit?: number
}

export async function getFilePagesByRelation(
  args: GetFilePagesByRelationArgs,
  deps: FileRelationDeps = LIVE
): Promise<readonly Page[]> {
  const want = args.limit ?? RPC_DEFAULT_LIMIT
  if (want <= 0) return []
  const asked = await (deps.naming ?? askNaming)({
    key: args.relationKey,
    name: args.relationValue,
    ...(args.pageTypeSlugs === undefined ? {} : { pageTypes: args.pageTypeSlugs }),
    limit: want,
  })
  if (!asked.ok) {
    throw new Error(`getFilePagesByRelation(${args.relationKey}): ${asked.why}`)
  }
  const found: Page[] = []
  for (const naming of asked.naming) {
    if (found.length >= want) break
    if (!(await isFileBacked(naming.pageType))) continue
    const shape = await fileShapeOf(naming.pageType)
    if (shape === null) continue
    const rows = buildRawPageRows({
      rows: naming.rows,
      definitions: shape.definitions,
      pageTypeId: shape.pageTypeId,
      pageTypeSlug: naming.pageType,
    })
    for (const row of rows) {
      if (found.length >= want) break
      found.push(pageOf({ ...row }))
    }
  }
  return found.map((page) => applySelect(page, args.select))
}
