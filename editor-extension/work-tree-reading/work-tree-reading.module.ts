import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeReading = {
  id: "01a06867-dbcb-78e4-a9b3-4a59f26c06ca",
  pageTypeSlug: "module",
  slug: "work-tree-reading",
  definition: "what is counted, keyed and opened from work tree rows already in hand",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count of the rows counts every row beneath a root as well as that root.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are answered with a row before every row beneath that row.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is the checkout joined to the path that row carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row carrying no path opens no document.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes a tree or reads an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
