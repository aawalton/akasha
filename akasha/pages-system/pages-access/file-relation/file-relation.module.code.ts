import type { Page } from "@akasha/pages-core/page-types"
import { askingFor } from "@akasha/pages-system-service/calling"
import { z } from "zod"
import { fileRelationDeclarations } from "../file-property-defs/file-property-defs.module.code.ts"
import { type FileReadDeps, fileBackedPageTypes } from "../file-read/file-read.module.code.ts"
import { kebabizeKey } from "../file-rows/file-rows.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

const ADDRESS = /^([a-z0-9-]+)\/([a-z0-9-]+)$/

const POINTS = /\brelation(-(?:slug|seq|id|name))?\b/

const SETTLED_BY_THE_ROW = "none"

const NO_NAMING =
  "reaching every page that names one page went through an index of what names what, built by asking each page type in turn. `@akasha/pages-system-service` answers one page type at a time and holds no such index, so which pages name a given page is not a question that can be put to it here."

export type FileRelationDeps = FileReadDeps

const LIVE: FileRelationDeps = {
  ask: (query) => askingFor(query),
  roster: fileBackedPageTypes,
}

function slugNamed(text: string): string {
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

export type Presence =
  | { readonly outcome: "stands" }
  | { readonly outcome: "absent" }
  | { readonly outcome: "unasked"; readonly why: string }

export async function pageUnder(
  targetSlug: string,
  name: string,
  deps: FileRelationDeps = LIVE
): Promise<Presence> {
  const named = slugNamed(name)
  const asked = await deps.ask({
    pageTypeSlug: targetSlug,
    keys: ["slug"],
    where: { slug: { is: named } },
    limit: 1,
  })
  if ("refused" in asked) return { outcome: "unasked", why: asked.refused }
  return asked.rows.length > 0 ? { outcome: "stands" } : { outcome: "absent" }
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
  _deps: FileRelationDeps = LIVE
): Promise<readonly Page[]> {
  throw new Error(
    `getFilePagesByRelation(${args.relationKey}): ${NO_NAMING} Name the page types to look under and ask each one for \`${args.relationKey}\` through \`@akasha/pages-system-service\`, or read what names a page from the index by \`@akasha/indexes\`.`
  )
}
