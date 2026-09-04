import type { Module } from "@akasha/code-system/module"

export const repoMeasuring = {
  id: "01a05a0e-6376-7000-a013-86be99eb36e0",
  pageTypeSlug: "module",
  slug: "repo-measuring",
  definition: "how many files the checkout holds and how many of them are in akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What git holds is what is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A file the repository ignores is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "Built output is what the repository ignores.",
    },
    {
      invariantKind: "departure",
      statement: "Built output is not a file waiting to arrive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file not yet committed is counted where the repository does not ignore that file.",
    },
    {
      invariantKind: "departure",
      statement: "A path git names more than once is counted once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A symbolic link is the one path git holds rather than the files the link reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A listing git could not answer throws rather than counting none.",
    },
    {
      invariantKind: "departure",
      statement: "The akasha folder is inside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "What the akasha folder holds is counted in both numbers.",
    },
    {
      invariantKind: "departure",
      statement: "The share is what has arrived over everything there is to arrive.",
    },
    {
      invariantKind: "absence",
      statement: "No folder is walked here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
