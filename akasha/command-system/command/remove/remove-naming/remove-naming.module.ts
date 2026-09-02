import type { Module } from "@akasha/code-system/module"

export const removeNaming = {
  id: "01a06262-70be-72a6-bd79-97c43cd61b5b",
  pageTypeSlug: "module",
  slug: "remove-naming",
  definition: "the tracked files still naming a path a removal takes, and what is said of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every tracked body the base commit holds is looked at.",
    },
    {
      invariantKind: "departure",
      statement: "A body git reads as binary is left out of the search.",
    },
    {
      invariantKind: "departure",
      statement: "A path the removal takes is left out of what is answered.",
    },
    {
      invariantKind: "departure",
      statement: "A search git could not run is answered as a refusal for the caller to carry.",
    },
    {
      invariantKind: "departure",
      statement: "A caller naming nothing is answered with no file rather than by asking git.",
    },
    {
      invariantKind: "departure",
      statement: "What was looked for is said alongside what was found.",
    },
    {
      invariantKind: "departure",
      statement: "Finding nothing is said as plainly as finding something.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that looked for nothing is answered with nothing to say.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here repoints a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "gap",
      statement: "A body reaching what goes by a name of its own is found.",
    },
  ],
} as const satisfies Module
