import type { Module } from "@akasha/code-system/module"

export const shapePredicate = {
  id: "01a06d15-c08a-7cb9-a166-2c8d5553765b",
  pageTypeSlug: "module",
  slug: "shape-predicate",
  definition: "what every sentence shape's predicate over a dependency tree is written against",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A predicate reads one sentence rather than a whole text.",
    },
    {
      invariantKind: "departure",
      statement: "A predicate answers with every place the shape is found in that sentence.",
    },
    {
      invariantKind: "departure",
      statement: "A predicate finding nothing answers with an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "A match names the tokens the match is made of.",
    },
    {
      invariantKind: "departure",
      statement: "A token is named by the number the parser gave that token.",
    },
    {
      invariantKind: "departure",
      statement: "A word class every predicate reads is named here rather than in each predicate.",
    },
    {
      invariantKind: "absence",
      statement: "A predicate says nothing about whether akasha writes in the shape.",
    },
    {
      invariantKind: "departure",
      statement: "Whether akasha writes in a shape is the shape page's own answer.",
    },
  ],
} as const satisfies Module
