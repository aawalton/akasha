import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Misconceptions = "md"

export const misconceptions = {
  id: "01a0659f-93da-700b-bde5-fd5dba638d0b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "misconceptions",
  propertySlug: "misconceptions",
  definition: "the wrong models of a topic surfaced and corrected",
} as const satisfies FileProperty
