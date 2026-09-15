import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const keptScratch = {
  id: "01a0a5f7-8de6-7000-a173-168cae364ba1",
  type: "page-type/test-fixture",
  slug: "kept-scratch",
  definition: "the scratch root more than one test file in a run reads, swept when the run ends",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept root is swept when the process ends rather than when a test file ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept root is what more than one test file in a run reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world kept roots are taken from is made the first time one is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test names only the prefix the test wants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The root and its sweeping are not its concern.",
    },
  ],
} as const satisfies TestFixture
