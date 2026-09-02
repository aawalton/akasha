import type { Module } from "@akasha/code-system/module"

export const libSetsSearchUiSharedState = {
  id: "01a0623c-2df8-79ac-aad0-2590ee5b5c47",
  pageTypeSlug: "module",
  slug: "lib-sets-search-ui-shared-state",
  definition: "the icons and localized words the search window shows",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Every favourite icon is formatted at 24 by 24 pixels.",
    },
    {
      invariantKind: "constraint",
      statement: "A set is taken to have at most twelve bonus lines.",
    },
  ],
} as const satisfies Module
