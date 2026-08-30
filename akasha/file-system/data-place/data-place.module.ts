import type { Module } from "../../code-system/module/module.page-type.ts"

export const dataPlace = {
  id: "01a05361-09df-7452-a3cc-9443498c1d89",
  pageTypeSlug: "module",
  slug: "data-place",
  definition: "where akasha keeps what it works out, under the folder git does not track",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The place is said here alone. What stands under it is named by whatever owns that.",
    },
    {
      invariantKind: "departure",
      statement: "The place is answered both under a root and on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A guard settles the place against a root.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names it as text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes.",
    },
    {
      invariantKind: "absence",
      statement: "Where the place stands is an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Whether anything stands there is asked of the disk by whoever asks.",
    },
    {
      invariantKind: "absence",
      statement: "What the place holds is not said here.",
    },
    {
      invariantKind: "absence",
      statement: "The index and the read record and a test's seeded warrants each name their own.",
    },
    {
      invariantKind: "absence",
      statement: "None of them is known here.",
    },
  ],
} as const satisfies Module
