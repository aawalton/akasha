import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchArmorWeightFilter = {
  id: "01a0613a-e0a5-73ad-8749-ca689469fc54",
  pageTypeSlug: "module",
  slug: "search-armor-weight-filter",
  definition: "the armor weight of an item, narrowed by a multiselect of light, medium, and heavy",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The armor weight filter also adds the selected weight numbers to the server request.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no armor type fails a non-empty selection.",
    },
  ],
} as const satisfies Module
