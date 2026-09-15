import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const loreEntries = {
  id: "01a0673e-1000-7001-8f22-77c4a1e05522",
  type: "page-type/file-property",
  slug: "lore-entries",
  propertySlug: "lore-entries",
  definition: "what a game has settled as true in its world",
  extensions: ["jsonl"],
  types: "ts",
} as const satisfies FileProperty
