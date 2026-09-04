import type { Module } from "@akasha/code-system/module"

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
      statement: "The place is said here alone.",
    },
    {
      invariantKind: "departure",
      statement: "What stands under it is named by whatever owns that.",
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
      statement: "A refusal names the place as text.",
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
      statement: "The index names its own place.",
    },
    {
      invariantKind: "absence",
      statement: "The read record names its own place.",
    },
    {
      invariantKind: "absence",
      statement: "A test's seeded warrants name their own place.",
    },
    {
      invariantKind: "absence",
      statement: "None of them is known here.",
    },
  ],
} as const satisfies Module
