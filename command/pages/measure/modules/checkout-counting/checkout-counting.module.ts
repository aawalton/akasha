import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkoutCounting = {
  id: "01a06d1e-b1fe-7eae-ba21-1842c4d3106e",
  type: "module",
  slug: "checkout-counting",
  definition:
    "the files a checkout holds, how many lines each runs to, and the column they are set out in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files git has are the files listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the repository ignores is not listed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file not yet committed is listed where the repository does not ignore that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path git names more than once is listed once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A symbolic link is the one path git has rather than the files the link reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A listing git could not answer throws rather than answering empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A generated folder is named `generated` or `build` or `dist` or `out` or `coverage`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder name is matched whole rather than as the opening of a longer name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name carrying `generated` before its extension was generated.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a generated file is counted is answered by the caller rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is counted by the newline ending that line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A last line ending in no newline is counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty file has no lines.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file that could not be read answers no number rather than a zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first column is set out to the left and every later column to the right.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A column is as wide as the widest thing that column has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row naming fewer columns than the widest row ends where its own columns end.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No folder is walked here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a file is text.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
