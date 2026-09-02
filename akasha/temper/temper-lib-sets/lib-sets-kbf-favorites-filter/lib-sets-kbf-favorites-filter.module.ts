import type { Module } from "@akasha/code-system/module"

export const libSetsKbfFavoritesFilter = {
  id: "01a0623e-53a1-7630-820e-af044a097b87",
  pageTypeSlug: "module",
  slug: "lib-sets-kbf-favorites-filter",
  definition: "the dropdown of favourite categories a set can be marked with",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The first entry of the dropdown covers sets marked with no favourite.",
    },
  ],
} as const satisfies Module
