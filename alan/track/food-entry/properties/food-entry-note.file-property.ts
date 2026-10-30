import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const foodEntryNote = {
  id: "01a065a3-6e8b-7a46-8d82-d17125d32225",
  type: "page-type/file-property",
  slug: "food-entry-note",
  propertySlug: "note",
  definition: "a note that describes something Alan has eaten and how its numbers were found",
  extensions: ["txt"],
  types: "ts",
  createdAt: "2026-09-03T05:00:04.619Z",
  updatedAt: "2026-10-30T16:47:12.499Z",
} as const satisfies FileProperty
