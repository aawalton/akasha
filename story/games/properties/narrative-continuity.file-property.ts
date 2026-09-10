import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type NarrativeContinuity = "json"

export const narrativeContinuity = {
  id: "01a0673c-8e0e-7011-9edd-32a6851006ec",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "narrative-continuity",
  propertySlug: "narrative-continuity",
  definition: "what a game must keep true across its turns",
} as const satisfies FileProperty
