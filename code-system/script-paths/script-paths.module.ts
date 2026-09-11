import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const scriptPaths = {
  id: "01a08ee1-df5c-739b-aaae-9c94d47a27ee",
  pageTypeSlug: "module",
  type: "module",
  slug: "script-paths",
  definition: "the paths a composed script names under the checkout root",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A script names a file in this checkout against the root the script found.",
    },
    {
      invariantKind: "departure",
      statement: "A name runs from the root to the closing quote of the word holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming no such file holds no name.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a name reaches a file that is there is not judged here.",
    },
  ],
} as const satisfies Module
