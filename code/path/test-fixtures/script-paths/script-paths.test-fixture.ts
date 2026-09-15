import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const scriptPaths = {
  id: "01a08ee1-df5c-739b-aaae-9c94d47a27ee",
  type: "page-type/test-fixture",
  slug: "script-paths",
  definition: "the paths a composed script names under the checkout root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A script names a file in this checkout against the root the script found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The root is written `$AKASHA_ROOT`, `${AKASHA_ROOT}` or `${AKASHA_ROOT:-a fallback}`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name begins after the separator that follows the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name runs from the root to the closing quote of the word holding it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every name a line holds is answered rather than the first alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line naming no such file holds no name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A root with no quote directly before it holds no name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A word holding a further expansion holds no name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A name built on a variable other than the root is not read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a name reaches a file that is there is not judged here.",
    },
  ],
} as const satisfies TestFixture
