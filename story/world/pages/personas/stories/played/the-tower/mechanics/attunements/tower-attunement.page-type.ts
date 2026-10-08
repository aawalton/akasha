import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerAttunement = {
  id: "01a0ca71-7e6e-7997-b7c4-3c218a335e36",
  type: "page-type/page-type",
  slug: "tower-attunement",
  definition: "how much control a character in the Tower has over an element",
  pluralSlug: "attunements",
  extends: ["page-type/world-attunement"],
  parts: [],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:47:10.702Z",
  updatedAt: "2026-09-26T16:07:36.000Z",
} as const satisfies PageType
