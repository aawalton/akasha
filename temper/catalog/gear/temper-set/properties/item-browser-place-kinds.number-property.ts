import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const itemBrowserPlaceKinds = {
  id: "01a0d8e1-f7c1-7f6a-8317-7dba582be7cf",
  type: "page-type/number-property",
  slug: "item-browser-place-kinds",
  propertySlug: "item-browser-place-kinds",
  definition: "the kinds of place the item browser files a set's drop places as",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind is the number the item browser's drop filter picks it with, less three.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
