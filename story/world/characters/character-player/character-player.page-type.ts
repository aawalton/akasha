import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterPlayer = {
  id: "01a0c9ee-c13b-7e54-a823-a455c8cf45ac",
  type: "page-type/page-type",
  slug: "character-player",
  definition: "the character a player plays",
  extends: ["page-type/world-character"],
  types: "ts",
  schema: "jsonl",
  properties: [
    { pageProperty: "relation-property/character-story", required: true, many: false },
    { pageProperty: "relation-property/character-place", required: false, many: false },
    { pageProperty: "relation-property/person", required: true, many: false },
    { pageProperty: "text-property/coffee-shop-date-perceiving", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-knowing", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-feeling", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-wanting", required: false, many: false },
    { pageProperty: "text-property/coffee-shop-date-doing", required: false, many: false },
    { pageProperty: "file-property/coffee-shop-date-turn-states", required: false, many: false },
  ],
  parts: [],
} as const satisfies PageType
