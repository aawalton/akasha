import type { Module } from "../../../code-system/module/module.page-type.ts"

export const indexShadow = {
  id: "01a04f55-91a5-787e-8588-31ac5cc7cb0c",
  pageTypeSlug: "module",
  slug: "index-shadow",
  definition: "the index as a change would leave it, read without the change being written",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A check judging a change reads the index the change leaves, not the index the last commit left.",
    },
    {
      invariantKind: "departure",
      statement:
        "What the change files is worked out by the same rule a landing settles by, so the shadow and the landing cannot say different things.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shadow lies over the committed index and holds only the entry files the change touches, so it costs what the change is and not what the index is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's body is read from the change where the change carries it, so a page and the property it leans on land together.",
    },
    {
      invariantKind: "departure",
      statement:
        "An audit leaves everything as it stands, and there the committed index is the answer, worked out from nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow that could not be worked out is refused and never stood in for by the committed index.",
    },
    {
      invariantKind: "departure",
      statement:
        "One change is one shadow, held against the change itself, so every check asking gets the one that was worked out.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing is copied and no scratch directory is made, so there is nothing to sweep and nothing to leak.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the index. A shadow is read and never landed.",
    },
  ],
} as const satisfies Module
