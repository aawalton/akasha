import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const imageTag = {
  id: "01a0de87-c73f-7ecf-9155-3df91513dec0",
  type: "page-type/page-type",
  slug: "image-tag",
  definition: "a word an image is classified by",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "image tag" },
    { partOfSpeech: "part-of-speech/noun", spelling: "image tags" },
  ],
  extends: ["page-type/page"],
  parts: [
    "page-type/age-tag",
    "page-type/ethnicity-tag",
    "page-type/fantasy-tag",
    "page-type/pose-tag",
    "page-type/setting-tag",
    "page-type/wardrobe-tag",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every image tag is of one facet, and each facet is a page type extending this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image states its tags of each facet under a property of that facet alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model reading an image suggests its tags rather than choosing from a list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent running that model folds suggested tags that mean one thing into one tag.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
