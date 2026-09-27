import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPotion = {
  id: "01a0e0a0-9199-7c1b-8a58-f31fdaa90b21",
  type: "page-type/page-type",
  slug: "temper-potion",
  definition: "a drink a build takes",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A potion's hash place is its place among every potion, whichever kind it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No potion is a temper-potion page of no narrower kind, at hash place 0.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
