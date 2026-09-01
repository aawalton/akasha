import type { Module } from "@akasha/code-system/module"

export const answerMark = {
  id: "01a05cb3-7cca-73df-aa84-7bd0d93da845",
  pageTypeSlug: "module",
  slug: "answer-mark",
  definition: "the one name a kind and a subject and a runtime and a set of inputs hash down to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Inputs handed in any order hash to the same mark.",
    },
    {
      invariantKind: "departure",
      statement: "An input is a path and the object id of what stands at the path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
