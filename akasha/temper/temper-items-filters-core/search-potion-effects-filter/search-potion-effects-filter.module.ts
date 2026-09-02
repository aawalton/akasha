import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchPotionEffectsFilter = {
  id: "01a0613a-e0ab-720b-94a5-6dafe7b134f2",
  pageTypeSlug: "module",
  slug: "search-potion-effects-filter",
  definition:
    "the effects a potion carries, narrowed by a multiselect of health, magicka, and stamina restore",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item matches the selection where the item carries a selected effect.",
    },
    {
      invariantKind: "absence",
      statement: "The three restore effects are offered rather than the full potion effect list.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
