import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const currencyCatalogCapture = {
  id: "01a060e2-3184-7c0b-a09e-795eff7eebf3",
  pageTypeSlug: "module",
  slug: "currency-catalog-capture",
  definition: "the game's currencies, read out of the client into the add-on's saved variables",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The collector adds itself to the catalog registry as the module loads.",
    },
    {
      invariantKind: "departure",
      statement: "A currency the client calls invalid is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Each currency carries whether the bank holds that currency.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads how much of a currency the player holds.",
    },
  ],
} as const satisfies Module
