import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const ctwAchievement = {
  id: "01a06579-e4f7-7cac-8aa3-87b59725c97d",
  type: "page-type/page-type",
  slug: "ctw-achievement",
  definition: "one mark a player of Clear the World earns by passing a threshold",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["number-property/threshold", "select-property/ctw-scope", "text-property/metric"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/ctw-scope", required: true, many: false },
    { pageProperty: "text-property/metric", required: true, many: false },
    { pageProperty: "number-property/threshold", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An achievement is earned when its metric reaches its threshold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scope says whose count the metric is read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A description tells the real mine action the mark is named for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose here is quoted from the world rather than written to the taboo terms.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
