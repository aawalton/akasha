import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const turns = {
  id: "01a0673c-8e0e-7014-8deb-3231aa6c6114",
  type: "file-property",
  slug: "turns",
  propertySlug: "turns",
  definition: "every turn a game has been played through",
  extensions: ["jsonl"],
  types: "ts",
} as const satisfies FileProperty
