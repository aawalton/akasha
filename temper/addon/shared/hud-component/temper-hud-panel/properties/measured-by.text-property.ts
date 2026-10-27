import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const measuredBy = {
  id: "01a17ede-d904-7317-8f7f-9ec8ac8f1fac",
  type: "page-type/text-property",
  slug: "measured-by",
  propertySlug: "measured-by",
  definition: "the global name of the control whose height is a panel's height",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel stating no control that measures it is as tall as its own control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel measured by another control is made as tall as that control.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-27T19:38:16.195Z",
  updatedAt: "2026-10-27T19:38:16.195Z",
} as const satisfies TextProperty
