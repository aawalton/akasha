import type { PageWhere } from "@shared/pages-core/page-types"

export function tryExtractIdEq(where: PageWhere): string | undefined {
  if (where.length !== 1) return undefined
  const cond = where[0]
  if (!cond || !("key" in cond)) return undefined
  if (cond.key !== "id") return undefined
  if (!("eq" in cond)) return undefined
  return typeof cond.eq === "string" ? cond.eq : undefined
}

export function tryExtractSeqEq(where: PageWhere): number | undefined {
  if (where.length !== 1) return undefined
  const cond = where[0]
  if (!cond || !("key" in cond)) return undefined
  if (cond.key !== "seq") return undefined
  if (!("eq" in cond)) return undefined
  return typeof cond.eq === "number" ? cond.eq : undefined
}

export function tryExtractIdIn(where: PageWhere): readonly string[] | undefined {
  if (where.length !== 1) return undefined
  const cond = where[0]
  if (!cond || !("key" in cond)) return undefined
  if (cond.key !== "id") return undefined
  if (!("in" in cond)) return undefined
  const ids = cond.in
  if (!ids.every((v): v is string => typeof v === "string")) return undefined
  return ids
}
