import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const putting = {
  id: "01a04efb-4361-7984-87ce-b338a39e98b3",
  type: "page-type/test-fixture",
  slug: "putting",
  definition: "a file put where a test wants it in a tree it set up, and whether one is there",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The folders a path names are made on the way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is said from the root handed in rather than from where the test runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the file landed is handed back.",
    },
  ],
} as const satisfies TestFixture
