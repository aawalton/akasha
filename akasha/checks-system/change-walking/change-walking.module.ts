import type { Module } from "../../code-system/module/module.page-type.ts"

export const changeWalking = {
  id: "01a0583c-9b26-78cf-972c-3801c6b1ad94",
  pageTypeSlug: "module",
  slug: "change-walking",
  definition: "how a check reaches the text it judges",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here loads a check.",
    },
    {
      invariantKind: "departure",
      statement: "A selector says what a check takes as input.",
    },
    {
      invariantKind: "departure",
      statement: "A selector takes as input every path it hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "A body that stands and will not open refuses the check reading it.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing at nothing reads as nothing rather than as unreadable.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text refuses the check reading it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a body that is not text names the path it stands at.",
    },
    {
      invariantKind: "gap",
      statement: "Every check walks a change through this.",
    },
  ],
} as const satisfies Module
