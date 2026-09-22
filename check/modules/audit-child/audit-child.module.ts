import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const auditChild = {
  id: "01a0a064-3e4a-7000-ad1d-00f2d5f33c09",
  type: "page-type/module",
  slug: "audit-child",
  definition: "a check's audit run in a process of its own, answered into a file it is handed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit of work is one check rather than every check an audit would run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The check named is the only check gathered, so no other check's code loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No change is handed in, the audit collecting from the commit what that audit judges.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The working set the check builds dies with the process the check ran in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the check judged is written to the file the caller named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is written to the output stream, because a check may write there itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no root, no check or no file to answer into judges nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check this tree gathers nothing for judges nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cost of the run is recorded by the run itself rather than by the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here holds the process to a ceiling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here keeps a verdict, which is the caller's to keep.",
    },
  ],
} as const satisfies Module
