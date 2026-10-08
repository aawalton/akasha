import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const lyrics = {
  id: "01a06243-144b-700c-a7ba-afd27e518801",
  type: "page-type/file-property",
  slug: "lyrics",
  propertySlug: "lyrics",
  definition: "the words of a song",
  extensions: ["txt"],
  types: "ts",
  createdAt: "2026-09-02T13:15:58.411Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
