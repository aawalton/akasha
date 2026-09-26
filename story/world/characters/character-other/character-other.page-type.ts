import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterOther = {
  id: "01a0ca22-a973-71c0-954e-899e1c4b289f",
  type: "page-type/page-type",
  slug: "character-other",
  definition: "a character no player plays",
  extends: ["page-type/world-character"],
  parts: ["relation-property/character-persona"],
  properties: [
    { pageProperty: "relation-property/character-story", required: true, many: false },
    { pageProperty: "relation-property/character-place", required: false, many: false },
    { pageProperty: "relation-property/character-persona", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-perceiving", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-knowing", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-feeling", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-wanting", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-doing", required: false, many: false },
    { pageProperty: "file-property/coffee-shop-date-turn-states", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
