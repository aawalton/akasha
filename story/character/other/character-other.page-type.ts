import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterOther = {
  id: "01a0ca22-a973-71c0-954e-899e1c4b289f",
  type: "page-type/page-type",
  slug: "character-other",
  definition: "a character no player plays",
  extends: ["page-type/character"],
  parts: ["relation-property/character-persona"],
  properties: [
    { pageProperty: "relation-property/character-persona", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
