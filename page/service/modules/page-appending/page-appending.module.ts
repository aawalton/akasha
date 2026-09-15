import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageAppending = {
  id: "01a0a220-998d-7000-b216-e0937326b6fb",
  type: "module",
  slug: "page-appending",
  definition: "lines added to the end of a file part a page keeps outside the commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is appended beside a page that is there and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path naming no page here is refused rather than given a file of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An append names the part it is kept under, and entries is the part it falls back to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every line appended ends with a newline.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines of one append land together or land nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A part filled to its ceiling rolls to the next part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An append takes a turn over the first part before any line lands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An append that took no turn is refused rather than waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer names the file part the lines landed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here commits.",
    },
  ],
} as const satisfies Module
