import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const carTrim = {
  id: "01a06827-645d-74f5-957f-25b077d85817",
  type: "page-type/page-type",
  slug: "car-trim",
  definition: "one specification a model year is sold in",
  extends: ["page-type/car"],
  parts: ["relation-property/car-year", "number-property/msrp"],
  properties: [{ pageProperty: "relation-property/car-year", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim names the year above that trim and is the last level of the catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trim is a row in its make's file rather than a page filed on its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
