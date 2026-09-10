import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const repoSeeding = {
  id: "01a08cc2-9f09-710e-8d8a-30169349b3d9",
  pageTypeSlug: "module",
  type: "module",
  slug: "repo-seeding",
  definition: "a scratch akasha repository a change can be landed into",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seeded repository holds a commit, a check, the warrants and an agent's record.",
    },
    {
      invariantKind: "departure",
      statement: "One set of bodies is seeded once and copied for each repository asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Every repository seeded here goes when the test file that asked for one ends.",
    },
    {
      invariantKind: "departure",
      statement: "A repository whose checks will not load is one whose check code was taken away.",
    },
    {
      invariantKind: "departure",
      statement: "A body seeded is recorded as read, so a change writing over it is warranted.",
    },
    {
      invariantKind: "departure",
      statement: "A write goes up the road a command takes, from the arguments to the commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the repository this repository is seeded from.",
    },
  ],
} as const satisfies Module
