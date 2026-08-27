import { type FileRelationDeps, getFilePagesByRelation } from "./file-relation"
import type { PageSelect } from "./types"
import type { Page, PageWhere } from "@shared/pages-core/page-types"

export type GetPagesByRelationArgs = {
  relationKey: string
  relationValue: string
  pageTypeSlugs?: readonly string[]
  select?: PageSelect
  limit?: number
}

export async function getPagesByRelation(
  args: GetPagesByRelationArgs,
  deps?: FileRelationDeps
): Promise<readonly Page[]> {
  const forFiles = {
    relationKey: args.relationKey,
    relationValue: args.relationValue,
    pageTypeSlugs: args.pageTypeSlugs,
    select: args.select,
    limit: args.limit,
  }
  return deps === undefined
    ? getFilePagesByRelation(forFiles)
    : getFilePagesByRelation(forFiles, deps)
}

export function extractRelationContainment(
  where: PageWhere | undefined
): { relationKey: string; relationValue: string } | null {
  if (where == null || where.length !== 1) return null
  const cond = where[0]
  if (cond == null) return null
  if ("eq" in cond && typeof cond.eq === "string") {
    return { relationKey: cond.key, relationValue: cond.eq }
  }
  if ("includes" in cond && typeof cond.includes === "string") {
    return { relationKey: cond.key, relationValue: cond.includes }
  }
  return null
}
