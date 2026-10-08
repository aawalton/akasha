import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const foodEntryNote = {
  id: "01a065a3-6e8b-7a46-8d82-d17125d32225",
  type: "page-type/file-property",
  slug: "food-entry-note",
  propertySlug: "note",
  definition: "what was eaten and how a food entry's figures were worked out",
  extensions: ["txt"],
  types: "ts",
  createdAt: "2026-09-03T05:00:04.619Z",
  updatedAt: "2026-09-15T16:56:11.000Z",
} as const satisfies FileProperty
