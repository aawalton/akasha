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
    "number-property/jump-points",
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
    { pageProperty: "number-property/jump-points", required: false, many: true, maxCount: null },
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
    {
      decisionKind: "decision-kind/departure",
      statement: "A star's effects are what the star gives at its most points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A star stating no jump points gives each point spent an equal share of its effects.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A star stating jump points gives the share of its effects its highest jump point reached earns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A star with points short of its first jump point gives nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slottable star gives its effects only while it is slotted.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
  createdAt: "2026-09-27T04:53:17.836Z",
  updatedAt: "2026-10-19T22:40:43.300Z",
} as const satisfies PageType
