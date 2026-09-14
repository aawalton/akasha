import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const hookJudging = {
  id: "01a04f83-5df2-71b1-a666-6309398763b8",
  type: "test-fixture",
  slug: "hook-judging",
  definition: "a hook's judgement asked the way a test asks it, from the root it is in",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test asks about a call made at the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call made anywhere else is the exception.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test says so out loud.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The root a hook is judged against is bound before the hook is asked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test asking about a call under another root must name that root explicitly.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A hook's own judgement is handed in and handed back with its root bound.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The code here is set up by the tests that reach for this module.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Proving itself would prove nothing about any hook.",
    },
  ],
} as const satisfies TestFixture
