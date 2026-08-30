import type { Module } from "../../code-system/module/module.page-type.ts"

export const shadow = {
  id: "01a053a5-3240-7a15-81e0-042ef50c4d89",
  pageTypeSlug: "module",
  slug: "shadow",
  definition: "the files and index as a change would leave them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A check judging a change reads the index the change leaves rather than the index the last commit left.",
    },
    {
      invariantKind: "departure",
      statement: "What the change files is worked out by the same rule a landing settles by.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shadow lies over the committed index and holds only the entry files the change touches.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's body is read from the change where the change carries it and from the tree where it does not.",
    },
    {
      invariantKind: "departure",
      statement: "An audit leaves everything as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "There the committed index is the answer worked out from nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change answering `before` and `after` with one reader is a change nothing moved in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow that could not be worked out is refused and never stood in for by the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "One change is one shadow held against the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow over a change is asked for one way.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow handed to something that may not read it is worked out when it is first read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is copied and no scratch directory is made.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the index.",
    },
  ],
} as const satisfies Module
