import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerIntellect = {
  id: "01a0c9f8-07ea-7aa5-a99c-f754925d3688",
  type: "page-type/page-type",
  slug: "tower-intellect",
  definition: "how well a character in the Tower reasons",
  extends: ["page-type/tower-attribute"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
