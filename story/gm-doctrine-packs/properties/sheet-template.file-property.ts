import type { FileProperty } from "@akasha/pages-system/file-property"

export type SheetTemplate = "json"

export const sheetTemplate = {
  id: "01a06590-c57a-7201-a530-de554be9820c",
  pageTypeSlug: "file-property",
  slug: "sheet-template",
  propertySlug: "sheet-template",
  definition: "the shape a character sheet takes before a game's rulebook fills the sheet",
} as const satisfies FileProperty
