import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const proseRewrite = {
  id: "01a08245-78cc-7f77-96bc-39695e9c2410",
  type: "module",
  slug: "prose-rewrite",
  definition: "the words a passage is written with in place of the words it was written with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pair is tried only against the frame that pair names.",
    },
    {
      invariantKind: "departure",
      statement: "A word in a frame no pair names is left as it was written.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern of many words takes every word of that pattern rather than one.",
    },
    {
      invariantKind: "departure",
      statement: "The first pair that matches is the pair taken.",
    },
    {
      invariantKind: "departure",
      statement: "A passage is rewritten from its end.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a sentence's tree.",
    },
  ],
} as const satisfies Module
