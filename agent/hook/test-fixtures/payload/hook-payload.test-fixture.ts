import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const hookPayload = {
  id: "01a04f4d-f0ea-791d-8bb4-ce41b59e46b1",
  type: "page-type/test-fixture",
  slug: "hook-payload",
  definition: "what a test sends a hook in place of Claude Code",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the call was made is carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hook that does not refuse on where the call was made is handed that place anyway.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing in the running system makes a payload.",
    },
  ],
} as const satisfies TestFixture
