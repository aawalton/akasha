import type { Module } from "@akasha/code/module"

export const mechanicalFiling = {
  id: "01a07bdb-21d1-719a-b4d8-4208b5776792",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A body to write goes in through the change adding a file of any kind.",
    },
    {
      invariantKind: "departure",
      statement: "A path to take away goes through the change removing a file.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text refuses the call rather than being landed.",
    },
    {
      invariantKind: "departure",
      statement: "Every body a call has is worked out before any of them is run.",
    },
    {
      invariantKind: "departure",
      statement: "No check runs over a body landed here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps an edit rather than landing it.",
    },
    {
      invariantKind: "absence",
      statement: "Which callers may land this way is settled elsewhere.",
    },
  ],
} as const satisfies Module
