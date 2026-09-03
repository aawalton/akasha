import type { Module } from "@akasha/code-system/module"

export const entryCeiling = {
  id: "01a0680c-5278-7c36-a60c-23134f2fdb94",
  pageTypeSlug: "module",
  slug: "entry-ceiling",
  definition: "the most bytes one file beside a page holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ceiling is eight mebibytes.",
    },
    {
      invariantKind: "departure",
      statement: "One number is the ceiling a check enforces and the ceiling a writer rolls at.",
    },
    {
      invariantKind: "departure",
      statement: "A writer opens another part rather than letting a file pass the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A file of entries and a file of records are held to the same ceiling.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which files the ceiling reaches.",
    },
  ],
} as const satisfies Module
