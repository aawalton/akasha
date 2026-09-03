import type { FileProperty } from "@akasha/pages-system/file-property"

export type Evidence = "md"

export const evidence = {
  id: "01a0659f-93da-700d-ae61-1d400bcdb7ff",
  pageTypeSlug: "file-property",
  slug: "evidence",
  propertySlug: "evidence",
  definition: "the probes of a topic Alan cleared and the ones he did not",
} as const satisfies FileProperty
