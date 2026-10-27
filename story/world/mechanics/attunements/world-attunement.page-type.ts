import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldAttunement = {
  id: "01a0ca70-87e3-7f2e-a7a8-97be013a98f5",
  type: "page-type/page-type",
  slug: "world-attunement",
  definition: "how much control a character has over an element",
  pluralSlug: "attunements",
  extends: ["page-type/world-mechanic"],
  parts: [
    "number-property/attunement-counter",
    "relation-property/attunement-character",
    "relation-property/attunement-element",
    "relation-property/rank-of-attunement",
    "page-type/attunement-rank",
  ],
  properties: [
    { pageProperty: "relation-property/attunement-character", required: true, many: false },
    { pageProperty: "relation-property/attunement-element", required: true, many: false },
    { pageProperty: "relation-property/rank-of-attunement", required: true, many: false },
    { pageProperty: "number-property/attunement-counter", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:46:07.587Z",
  updatedAt: "2026-10-27T20:05:18.843Z",
} as const satisfies PageType
