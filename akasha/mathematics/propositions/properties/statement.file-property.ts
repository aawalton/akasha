import type { FileProperty } from "@akasha/pages-system/file-property"

export type Statement = "txt"

export const statement = {
  id: "01a06575-c2ac-775e-b2b7-7612c1f4de2d",
  pageTypeSlug: "file-property",
  slug: "statement",
  propertySlug: "statement",
  definition: "what a proposition says, written out",
} as const satisfies FileProperty
