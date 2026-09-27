import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperJewelryTrait = {
  id: "01a05fd1-d433-7c53-933e-ed171c6f7cf9",
  type: "page-type/page-type",
  slug: "temper-jewelry-trait",
  definition: "a property worked into a piece of jewelry",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["relation-property/jewelry-trait"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-trait-constant-name", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's hash place is the index a build hash has for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait a build may pick is available, and a trait kept only for sale is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait's effects state its legendary worth, and its grades state each quality.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
