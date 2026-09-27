import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperQuality = {
  id: "01a05fd1-d43f-7460-806b-41a2697dcbed",
  type: "page-type/page-type",
  slug: "temper-quality",
  definition: "the grade of a piece",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "change-generator/quality-ids-keeping",
    "data-table/quality-ids",
    "number-property/eso-display-quality",
    "text-property/game-name",
    "number-property/armor-level-scale",
    "number-property/weapon-level-scale",
    "number-property/set-bonus-scale",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "number-property/eso-display-quality", required: true, many: false },
    { pageProperty: "text-property/game-name", required: false, many: false },
    { pageProperty: "number-property/armor-level-scale", required: false, many: false },
    { pageProperty: "number-property/weapon-level-scale", required: false, many: false },
    { pageProperty: "number-property/set-bonus-scale", required: false, many: false },
    { pageProperty: "boolean-property/default-quality", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A graded quality states how it scales level-made armor, weapons and set bonuses.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A quality's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality is graded when it is available and is not the no-quality sentinel.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
