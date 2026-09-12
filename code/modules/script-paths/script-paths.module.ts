import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const scriptPaths = {
  id: "01a08ee1-df5c-739b-aaae-9c94d47a27ee",
  type: "module",
  slug: "script-paths",
  definition: "the paths a composed script names under the checkout root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script names a file in this checkout against the root the script found.",
    },
    {
      invariantKind: "departure",
      statement:
        "The root is written `$AKASHA_ROOT`, `${AKASHA_ROOT}` or `${AKASHA_ROOT:-a fallback}`.",
    },
    {
      invariantKind: "departure",
      statement: "A name begins after the separator that follows the root.",
    },
    {
      invariantKind: "departure",
      statement: "A name runs from the root to the closing quote of the word holding it.",
    },
    {
      invariantKind: "departure",
      statement: "Every name a line holds is answered rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming no such file holds no name.",
    },
    {
      invariantKind: "absence",
      statement: "A root with no quote directly before it holds no name.",
    },
    {
      invariantKind: "absence",
      statement: "A word holding a further expansion holds no name.",
    },
    {
      invariantKind: "absence",
      statement: "A name built on a variable other than the root is not read here.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a name reaches a file that is there is not judged here.",
    },
  ],
} as const satisfies Module
