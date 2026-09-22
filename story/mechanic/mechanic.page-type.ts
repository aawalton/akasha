import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const mechanic = {
  id: "01a0c9ea-d7b7-7f79-bc32-4aec8e645b69",
  type: "page-type/page-type",
  slug: "mechanic",
  definition: "a rule the play of a story runs by",
  pluralSlug: "mechanics",
  extends: ["page-type/page"],
  parts: ["file-property/history", "page-type/character-attribute", "page-type/resource"],
  properties: [{ pageProperty: "file-property/history", required: false, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
