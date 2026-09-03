import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type ToDoAnchoredFromCompletion = boolean

export const toDoAnchoredFromCompletion = {
  id: "01a065a1-49b7-7591-afc7-de41dfe5e026",
  pageTypeSlug: "boolean-property",
  slug: "to-do-anchored-from-completion",
  propertySlug: "to-do-anchored-from-completion",
  definition:
    "whether the next round is counted from when it was last done rather than from when it was last due",
} as const satisfies BooleanProperty
