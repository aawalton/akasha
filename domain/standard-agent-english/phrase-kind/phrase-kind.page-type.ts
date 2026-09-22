import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const phraseKind = {
  id: "01a0c576-2e1a-7996-8a94-9a7d80b20c55",
  type: "page-type/page-type",
  slug: "phrase-kind",
  definition: "which sort a phrase is",
  parts: [
    "phrase-kind/noun-phrase",
    "phrase-kind/noun-group",
    "phrase-kind/preposition-phrase",
    "phrase-kind/domain-definition",
    "phrase-kind/noun-run",
    "phrase-kind/verb-phrase",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phrase kind is a group of words read as one rather than a job one word does.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
