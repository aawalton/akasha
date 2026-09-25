import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const itemBrowserItemId = {
  id: "01a0d8e1-f7c0-7396-9ce1-54a4aaf1376d",
  type: "page-type/number-property",
  slug: "item-browser-item-id",
  propertySlug: "item-browser-item-id",
  definition: "the item the item browser draws a set's row from",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A set with no row in the item browser states no item here.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
