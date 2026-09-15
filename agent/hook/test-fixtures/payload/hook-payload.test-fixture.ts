import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const hookPayload = {
  id: "01a04f4d-f0ea-791d-8bb4-ce41b59e46b1",
  type: "page-type/test-fixture",
  slug: "hook-payload",
  definition: "a hook payload as the agent sends one, made so a test can hand it to a hook",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the call was made is carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A hook that does not refuse on where the call was made is handed that place anyway.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing in the running system makes a payload.",
    },
  ],
} as const satisfies TestFixture
