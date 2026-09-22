import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const character = {
  id: "01a0c9ee-9556-79b7-90b9-394c11c2cf2b",
  type: "page-type/page-type",
  slug: "character",
  definition: "someone a story happens to",
  pluralSlug: "characters",
  extends: ["page-type/page"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
