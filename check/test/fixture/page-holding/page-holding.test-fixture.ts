import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const pageHolding = {
  id: "01a07bd7-36a3-7a1c-92e1-95945d838fd0",
  type: "page-type/test-fixture",
  slug: "page-holding",
  definition: "the paths a test's page and its code sit at, and the body of that code",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The body imports a path named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is said from the repository root.",
    },
  ],
  createdAt: "2026-09-07T12:28:16.931Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TestFixture
