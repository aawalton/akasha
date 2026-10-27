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
    { pageProperty: "relation-property/person", required: true, many: false },
  ],
  parts: [],
  createdAt: "2026-09-22T16:24:22.587Z",
  updatedAt: "2026-10-27T23:48:37.283Z",
} as const satisfies PageType
