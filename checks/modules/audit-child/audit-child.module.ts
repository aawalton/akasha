import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const auditChild = {
  id: "01a0a064-3e4a-7000-ad1d-00f2d5f33c09",
  type: "module",
  slug: "audit-child",
  definition: "one check's audit run in a process of its own, answered into a file it is handed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit of work is one check rather than every check an audit would run.",
    },
    {
      invariantKind: "departure",
      statement: "The check named is the only check gathered, so no other check's code loads.",
    },
    {
      invariantKind: "departure",
      statement: "The change judged is every path in the tree, as an audit's change is.",
    },
    {
      invariantKind: "departure",
      statement: "The working set the check builds dies with the process the check ran in.",
    },
    {
      invariantKind: "departure",
      statement: "What the check judged is written to the file the caller named.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is written to the output stream, because a check may write there itself.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no root, no check or no file to answer into judges nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A check this tree gathers nothing for judges nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The cost of the run is recorded by the run itself rather than by the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds the process to a ceiling.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps a verdict, which is the caller's to keep.",
    },
  ],
} as const satisfies Module
