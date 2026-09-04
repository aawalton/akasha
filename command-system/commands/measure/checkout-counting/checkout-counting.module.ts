import type { Module } from "@akasha/code-system/module"

export const checkoutCounting = {
  id: "01a06d1e-b1fe-7eae-ba21-1842c4d3106e",
  pageTypeSlug: "module",
  slug: "checkout-counting",
  definition:
    "the files a checkout holds, how many lines each runs to, and the column they are set out in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What git holds is what is listed.",
    },
    {
      invariantKind: "departure",
      statement: "A file the repository ignores is not listed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file not yet committed is listed where the repository does not ignore that file.",
    },
    {
      invariantKind: "departure",
      statement: "A path git names more than once is listed once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A symbolic link is the one path git holds rather than the files the link reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A listing git could not answer throws rather than listing none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generated folder is named `generated` or `build` or `dist` or `out` or `coverage`.",
    },
    {
      invariantKind: "departure",
      statement: "A folder name is matched whole rather than as the opening of a longer name.",
    },
    {
      invariantKind: "departure",
      statement: "A name carrying `generated` before its extension was generated.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a generated file is counted is answered by the caller rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "A line is counted by the newline ending that line.",
    },
    {
      invariantKind: "departure",
      statement: "A last line ending in no newline is counted.",
    },
    {
      invariantKind: "departure",
      statement: "An empty file holds no lines.",
    },
    {
      invariantKind: "departure",
      statement: "A file that could not be read answers no number rather than a zero.",
    },
    {
      invariantKind: "departure",
      statement: "The first column is set out to the left and every later column to the right.",
    },
    {
      invariantKind: "departure",
      statement: "A column is as wide as the widest thing that column holds.",
    },
    {
      invariantKind: "departure",
      statement: "A row naming fewer columns than the widest row ends where its own columns end.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is walked here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a file is text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
