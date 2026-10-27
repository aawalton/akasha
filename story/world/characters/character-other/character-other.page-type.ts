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
    { pageProperty: "relation-property/character-persona", required: false, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T17:21:04.371Z",
  updatedAt: "2026-10-27T23:48:37.283Z",
} as const satisfies PageType
