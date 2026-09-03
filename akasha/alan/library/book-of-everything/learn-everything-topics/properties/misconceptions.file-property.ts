import type { FileProperty } from "@akasha/pages-system/file-property"

export type Misconceptions = "md"

export const misconceptions = {
  id: "01a0659f-93da-700b-bde5-fd5dba638d0b",
  pageTypeSlug: "file-property",
  slug: "misconceptions",
  propertySlug: "misconceptions",
  definition: "the wrong models of a topic surfaced and corrected",
} as const satisfies FileProperty
