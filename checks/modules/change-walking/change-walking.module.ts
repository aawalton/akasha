import type { Module } from "@akasha/code-system/module"

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
      statement: "A body read as code is named `.ts` or `.tsx`.",
    },
    {
      invariantKind: "departure",
      statement: "A body read as a stylesheet is named `.css`.",
    },
    {
      invariantKind: "departure",
      statement: "A check judging both reaches them through one selector.",
    },
    {
      invariantKind: "departure",
      statement: "A selector takes as input every path the selector hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "A body that stands and will not open refuses the check reading that body.",
    },
    {
      invariantKind: "departure",
      statement: "A path standing at nothing reads as nothing rather than as unreadable.",
    },
    {
      invariantKind: "departure",
      statement:
        "A walk over everything takes what is in the tree rather than what the index names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file git leaves out of the tree is walked only where its name holds the reserved section `uncommitted`.",
    },
    {
      invariantKind: "departure",
      statement: "An installed dependency is walked by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A root that is no tree refuses the walk rather than taking nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body is opened rather than looked for and then opened.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text refuses the check reading that body.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for a body that is not text names the path that body stands at.",
    },
    {
      invariantKind: "gap",
      statement: "Every check walks a change through this module.",
    },
  ],
} as const satisfies Module
