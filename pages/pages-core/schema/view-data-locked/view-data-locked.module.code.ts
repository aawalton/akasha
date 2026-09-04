import * as z from "zod"

export const GRANULAR_LOCK_KEYS = [
  "pageType",
  "createPage",
  "deletePage",
  "editProperties",
  "changeLayout",
  "changeCoverSource",
  "changeCardSize",
  "changePropertyVisibility",
  "editRowIcon",
  "editRowValues",
] as const
export type GranularLockKey = (typeof GRANULAR_LOCK_KEYS)[number]

export const AGGREGATE_LOCK_KEYS = ["editPages", "editView", "editRows"] as const
type AggregateLockKey = (typeof AGGREGATE_LOCK_KEYS)[number]

export const LOCK_AGGREGATES: Record<AggregateLockKey, readonly GranularLockKey[]> = {
  editPages: ["createPage", "deletePage", "editProperties"],
  editView: ["changeLayout", "changeCoverSource", "changeCardSize", "changePropertyVisibility"],
  editRows: ["editRowIcon", "editRowValues"],
}

export const lockedFacetSchema = z.object({
  pageType: z.boolean().optional(),
  editPages: z.boolean().optional(),
  editView: z.boolean().optional(),
  editRows: z.boolean().optional(),
  createPage: z.boolean().optional(),
  deletePage: z.boolean().optional(),
  editProperties: z.boolean().optional(),
  changeLayout: z.boolean().optional(),
  changeCoverSource: z.boolean().optional(),
  changeCardSize: z.boolean().optional(),
  changePropertyVisibility: z.boolean().optional(),
  editRowIcon: z.boolean().optional(),
  editRowValues: z.boolean().optional(),
})

export type LockedFacet = z.infer<typeof lockedFacetSchema>

export function isFacetLocked(locked: LockedFacet | undefined, key: GranularLockKey): boolean {
  if (locked === undefined) return false
  if (locked[key] === true) return true
  for (const agg of AGGREGATE_LOCK_KEYS) {
    if (locked[agg] === true && LOCK_AGGREGATES[agg].includes(key)) return true
  }
  return false
}

export function mergeLockedFacets(
  parent: LockedFacet | undefined,
  view: LockedFacet | undefined
): LockedFacet | undefined {
  if (parent === undefined) return view
  if (view === undefined) return parent
  const merged: LockedFacet = { ...view }
  for (const key of GRANULAR_LOCK_KEYS) {
    if (parent[key] === true) merged[key] = true
  }
  for (const key of AGGREGATE_LOCK_KEYS) {
    if (parent[key] === true) merged[key] = true
  }
  return merged
}
