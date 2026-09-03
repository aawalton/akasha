import type { FileProperty } from "@akasha/pages-system/file-property"

export type Note = "txt"

export const note = {
  id: "01a065a3-6e8b-7a46-8d82-d17125d32225",
  pageTypeSlug: "file-property",
  slug: "note",
  propertySlug: "note",
  definition: "what was eaten and how a food entry's figures were worked out",
} as const satisfies FileProperty
