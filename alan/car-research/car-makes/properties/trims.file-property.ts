import type { FileProperty } from "@akasha/pages-system/file-property"

export type Trims = "jsonl"

export const trims = {
  id: "01a0659e-e27e-78a9-bf4d-aa931e9a9cf8",
  pageTypeSlug: "file-property",
  slug: "trims",
  propertySlug: "trims",
  definition: "every trim of every model year the make sells",
} as const satisfies FileProperty
