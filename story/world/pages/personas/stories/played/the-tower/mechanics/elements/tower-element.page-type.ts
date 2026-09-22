import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const towerElement = {
  id: "01a0ca6d-e683-7fa9-8dc8-8be6325284d8",
  type: "page-type/page-type",
  slug: "tower-element",
  definition: "a kind of essence the world of the Tower is made of",
  pluralSlug: "elements",
  extends: ["page-type/element"],
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "These are the elements met so far rather than every element the world holds.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
