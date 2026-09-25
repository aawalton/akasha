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
    {
      decisionKind: "decision-kind/departure",
      statement: "Each kind is the kind of the place at the same position among the sources.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrower place written after a colon takes no kind here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place has one kind, whichever set names it.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
