import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const checkStaging = {
  id: "01a08e16-827d-7f4d-bb26-5724ed027608",
  type: "page-type/test-fixture",
  slug: "check-staging",
  definition: "the scratch checkout for a check's test",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The checkout sits where the scratch world puts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body the checkout is asked for is written where that body's path says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a body the checkout is asked for imports is filed beside the page imported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page the import edge is sits in the checkout too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page named in the checkout is answered under its page type and slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page named in the checkout is answered under its id as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change over the checkout reads what it carries, then what it was handed, then the disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change made from bodies alone reads those bodies both before and after.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No git tree is made here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The checkout has the page type its pages are, so what a file belongs to is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That page type is the page itself rather than a page the fixture invents.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That page sits outside the tree a check reads, so no check is handed a file more.",
    },
  ],
} as const satisfies TestFixture
