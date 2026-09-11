import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const sheetTemplate = {
  id: "01a06590-c57a-7201-a530-de554be9820c",
  type: "file-property",
  slug: "sheet-template",
  propertySlug: "sheet-template",
  definition: "the shape a character sheet takes before a game's rulebook fills the sheet",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
