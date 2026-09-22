import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const charactersTaskProgressTestUtils = {
  id: "01a08ed6-a208-7d96-96d8-75bf328401f1",
  type: "page-type/test-fixture",
  slug: "characters-task-progress-test-utils",
  definition: "the saved character entry behind a progress resolver's test",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture the test leaves unnamed is absent from the entry rather than empty.",
    },
  ],
} as const satisfies TestFixture
