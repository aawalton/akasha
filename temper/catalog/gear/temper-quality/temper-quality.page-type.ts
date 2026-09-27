import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperQuality = {
  id: "01a05fd1-d43f-7460-806b-41a2697dcbed",
  type: "page-type/page-type",
  slug: "temper-quality",
  definition: "the grade of a piece",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["change-generator/quality-ids-keeping", "data-table/quality-ids"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
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
