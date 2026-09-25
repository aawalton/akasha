import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const itemBrowserSources = {
  id: "01a0d8e1-f7c1-73d7-bda0-c30dc885d934",
  type: "page-type/text-property",
  slug: "item-browser-sources",
  propertySlug: "item-browser-sources",
  definition: "the places the item browser names as where a set drops",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place is a zone id, or a number below zero the item browser names itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place shown with narrower places is written `place:narrower,narrower`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
