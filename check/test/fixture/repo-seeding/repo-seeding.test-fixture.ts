import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const repoSeeding = {
  id: "01a08cc2-9f09-710e-8d8a-30169349b3d9",
  type: "page-type/test-fixture",
  slug: "repo-seeding",
  definition: "a scratch akasha repository that takes a landing",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seeded repository holds a commit and a check and the warrants and an agent's record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One set of bodies is seeded once and copied for each repository asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every repository seeded here goes when the test file that asked for one ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body seeded is recorded as read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change writing over a seeded body is warranted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write goes up the road a command takes from the arguments to the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The command a run's cost is recorded beside is filed in the index a seeded repository carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the repository this repository is seeded from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seeded repository leaves its own index untracked, as a checkout does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What excludes the index is reached from here rather than spelled beside each fixture.",
    },
  ],
} as const satisfies TestFixture
