import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const bodying = {
  id: "01a04ee7-be07-7a1b-9f3f-f5e6d4693e70",
  type: "page-type/test-fixture",
  slug: "bodying",
  definition: "the bytes, and the body at a path, that a test hands to what it tries",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A test names the root once and is handed a way to make bodies under the root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text and bytes are both taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check is handed bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test says text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test binds the way the test was handed rather than a function of its own.",
    },
  ],
} as const satisfies TestFixture
