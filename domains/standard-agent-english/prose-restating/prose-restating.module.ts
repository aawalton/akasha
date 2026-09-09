import type { Module } from "@akasha/code/module"

export const proseRestating = {
  id: "01a08248-90ee-7792-9275-0a291dfa50af",
  pageTypeSlug: "module",
  type: "module",
  slug: "prose-restating",
  definition: "what each passage states once the constructions a term is banned in are rewritten",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A passage is parsed whole, so a word is read beside the sentence it sits in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a word sits is counted from the start of the passage rather than the sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A passage no pair rewrites is answered with nothing rather than with itself.",
    },
    {
      invariantKind: "departure",
      statement: "Who parses is handed in, so this is proved without the parser's model.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or writes one.",
    },
  ],
} as const satisfies Module
