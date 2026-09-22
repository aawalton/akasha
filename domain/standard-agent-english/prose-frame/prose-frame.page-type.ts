import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const proseFrame = {
  id: "01a08241-f81d-7e21-8584-c7cc1ab6cf98",
  type: "page-type/page-type",
  slug: "prose-frame",
  definition: "a word's construction",
  parts: [
    "prose-frame/fronted",
    "prose-frame/object",
    "prose-frame/participle",
    "prose-frame/placed",
  ],
  extends: ["page-type/domain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame is read off a sentence's tree rather than off the words in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One word in one sentence is in one frame.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word no frame here names is no construction Standard Agent English rewrites.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
