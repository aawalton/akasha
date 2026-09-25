import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseRewrite = {
  id: "01a08245-78cc-7f77-96bc-39695e9c2410",
  type: "page-type/module",
  slug: "prose-rewrite",
  definition: "the words replacing a passage's own words",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pair is tried only against the frame that pair names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word in a frame no pair names is left as it was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern of many words takes every word of that pattern rather than one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first pair that matches is the pair taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage is rewritten from its end.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a sentence's tree.",
    },
  ],
} as const satisfies Module
