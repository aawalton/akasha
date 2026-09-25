import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const graphEdge = {
  id: "01a04fe8-cebd-71d5-a040-d50b202e6eb1",
  type: "page-type/page-type",
  slug: "graph-edge",
  definition: "a way one thing reaches another",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "edge" },
    { partOfSpeech: "part-of-speech/noun", spelling: "edges" },
  ],
  parts: ["graph-edge/import-edge", "graph-edge/relation", "multi-relation-property/attributes"],
  extends: ["page-type/domain"],
  properties: [
    {
      pageProperty: "multi-relation-property/attributes",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An edge kind names the attributes that edge kind has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute names no edge.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
