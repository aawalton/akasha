import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const allAboutAlanModel = {
  id: "01a0657f-a729-72ba-94d1-7b8ccb90a8e4",
  type: "page-type/page-type",
  slug: "all-about-alan-model",
  definition: "a computation of a mechanism in Alan",
  extends: ["page-type/page"],
  parts: ["code-file-property/simulation"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "code-file-property/simulation", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model has the computation rather than the numbers the computation prints.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A topic citing a number cites the model the number came from.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T04:20:59.817Z",
  updatedAt: "2026-09-22T00:41:39.000Z",
} as const satisfies PageType
