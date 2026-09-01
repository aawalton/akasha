import type { Module } from "../../../../code-system/module/module.page-type.ts"

export const repoMeasuring = {
  id: "01a05a0e-6376-7000-a013-86be99eb36e0",
  pageTypeSlug: "module",
  slug: "repo-measuring",
  definition: "how many files the checkout holds and how many of them stand in akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "`node_modules` is skipped wherever it stands.",
    },
    {
      invariantKind: "departure",
      statement: "`.git` is skipped wherever it stands.",
    },
    {
      invariantKind: "departure",
      statement: "`dist` is skipped wherever it stands.",
    },
    {
      invariantKind: "departure",
      statement: "Built output is not a file waiting to arrive.",
    },
    {
      invariantKind: "departure",
      statement: "Only a regular file is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A symbolic link is not followed.",
    },
    {
      invariantKind: "departure",
      statement: "The akasha folder stands inside the repository.",
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
      statement: "Nothing here reads a body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
