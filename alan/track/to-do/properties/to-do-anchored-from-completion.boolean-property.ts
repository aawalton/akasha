import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const toDoAnchoredFromCompletion = {
  id: "01a065a1-49b7-7591-afc7-de41dfe5e026",
  type: "page-type/boolean-property",
  slug: "to-do-anchored-from-completion",
  propertySlug: "to-do-anchored-from-completion",
  definition:
    "whether the next round is counted from when it was last done rather than from when it was last due",
  types: "ts",
  createdAt: "2026-09-03T04:57:44.119Z",
  updatedAt: "2026-09-15T15:59:02.000Z",
} as const satisfies BooleanProperty
