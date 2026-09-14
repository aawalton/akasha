import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const treeSearching = {
  id: "01a0a06a-7815-7496-bab7-bcf7151d8cce",
  type: "module",
  slug: "tree-searching",
  definition: "the paths a search of the tree names, held to the ones the world carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every spelling asked after is searched for in one run.",
    },
    {
      invariantKind: "departure",
      statement: "A spelling is matched as written letters rather than as a pattern.",
    },
    {
      invariantKind: "departure",
      statement: "The file kinds searched are the ones the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "The git folder and the packages folder and the index folder are left unsearched.",
    },
    {
      invariantKind: "departure",
      statement: "A path the search names is answered against the root that search was handed.",
    },
    {
      invariantKind: "departure",
      statement: "The paths answered are the paths the world holds.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer so far writes is answered beside the paths the search names.",
    },
    {
      invariantKind: "departure",
      statement: "A search that named nothing and ended badly throws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A search naming paths is answered with those paths though that search ended badly.",
    },
    {
      invariantKind: "departure",
      statement: "A call asking after no spelling searches nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Which spelling a body holds is not said.",
    },
    {
      invariantKind: "absence",
      statement: "The program that searches is not looked for on the path.",
    },
  ],
} as const satisfies Module
