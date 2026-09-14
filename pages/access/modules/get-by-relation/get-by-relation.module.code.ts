import type { PageWhere } from "akasha/pages/core/modules/page-types/page-types.module.code.ts"

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
