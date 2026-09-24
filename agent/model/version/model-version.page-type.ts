import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const modelVersion = {
  id: "01a0d4b7-ebed-7a27-8b91-440087702aa8",
  type: "page-type/page-type",
  slug: "model-version",
  definition: "one model of a family, run with one context window",
  extends: ["page-type/page"],
  parts: ["text-property/model-id"],
  properties: [
    { pageProperty: "text-property/model-id", required: true, many: false },
    { pageProperty: "relation-property/model-family", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model version is titled the way its provider names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model run with a wider context window is a model version of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model version's slug is its id, with the context window set off by a hyphen.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
