import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterTrait = {
  id: "01a0ca5d-a4c3-7319-8fbf-53b82253baf0",
  type: "page-type/page-type",
  slug: "character-trait",
  definition: "a lasting way the rules bend for one character",
  pluralSlug: "character-traits",
  extends: ["page-type/trait"],
  parts: ["relation-property/trait-character"],
  properties: [{ pageProperty: "relation-property/trait-character", required: true, many: false }],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
