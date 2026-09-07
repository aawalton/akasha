import type { Module } from "@akasha/code/module"

export const mechanicalFiling = {
  id: "01a07bdb-21d1-719a-b4d8-4208b5776792",
  pageTypeSlug: "module",
  slug: "mechanical-filing",
  definition: "the files a command line names, landed with no gate run over the bodies",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The files a command line names are read by `file-arguing` rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal the reading answers with is passed back untouched.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies read are landed as a mechanical landing lands.",
    },
    {
      invariantKind: "departure",
      statement: "No check runs over a body landed here.",
    },
    {
      invariantKind: "departure",
      statement: "The name the caller was called as is said in the commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here drafts into a patch.",
    },
    {
      invariantKind: "absence",
      statement: "Which callers may land this way is settled elsewhere.",
    },
  ],
} as const satisfies Module
