import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperChampionStar = {
  id: "01a0e135-d98c-795f-9e2a-cf25be809fb6",
  type: "page-type/page-type",
  slug: "temper-champion-star",
  definition: "a champion star a character spends points on, or the empty place of none",
  extends: ["page-type/temper-thing"],
  parts: [
    "number-property/eso-champion-skill-id",
    "text-property/champion-constellation",
    "boolean-property/is-slottable",
  ],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    { pageProperty: "number-property/eso-champion-skill-id", required: true, many: false },
    { pageProperty: "text-property/champion-constellation", required: true, many: false },
    { pageProperty: "boolean-property/is-slottable", required: true, many: false },
    {
      pageProperty: "record-property/source-effects",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A champion star's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's title is the name its effect source shows.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
