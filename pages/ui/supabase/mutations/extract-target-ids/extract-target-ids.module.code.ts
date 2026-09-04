import type { PageWhere } from "@akasha/pages-core/page-types"

export function extractTargetIds(where: PageWhere | undefined): readonly string[] | null {
  if (!where) return null
  let narrowed: Set<string> | null = null
  for (const cond of where) {
    if (!("key" in cond) || cond.key !== "id") continue
    if ("eq" in cond) {
      const id = String(cond.eq)
      if (narrowed) {
        const current: string[] = [...narrowed]
        narrowed = new Set<string>(current.filter((x) => x === id))
      } else {
        narrowed = new Set<string>([id])
      }
    } else if ("in" in cond) {
      const ids = cond.in.map((v) => String(v))
      if (narrowed) {
        const current: string[] = [...narrowed]
        narrowed = new Set<string>(current.filter((x) => ids.includes(x)))
      } else {
        narrowed = new Set<string>(ids)
      }
    }
  }
  if (!narrowed) return null
  return [...narrowed]
}
