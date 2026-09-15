import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const checkStaging = {
  id: "01a08e16-827d-7f4d-bb26-5724ed027608",
  type: "test-fixture",
  slug: "check-staging",
  definition: "the scratch checkout a check's test runs over",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout sits where the scratch world puts it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body the checkout is asked for is written where that body's path says.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a body the checkout is asked for imports is filed in the import index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a body the checkout is asked for imports is filed beside the page imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The pages the import index and its edge are sit in the checkout too.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named in the checkout is answered under its page type and slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named in the checkout is answered under its id as well.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A change over the checkout reads what it carries, then what it was handed, then the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change made from bodies alone reads those bodies both before and after.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No git tree is made here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The checkout names the page type its pages are, so what a file belongs to is answered.",
    },
  ],
} as const satisfies TestFixture
