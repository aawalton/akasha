import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const lyrics = {
  id: "01a06243-144b-700c-a7ba-afd27e518801",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "lyrics",
  propertySlug: "lyrics",
  definition: "the words of a song",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
