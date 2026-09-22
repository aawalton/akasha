import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const establishedTurn = {
  id: "01a0c63c-5aeb-7de0-9471-3e3ffc821155",
  type: "page-type/number-property",
  slug: "established-turn",
  propertySlug: "established-turn",
  definition: "a bond's turn",
  nullable: false,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A turn a game holds is a page, and this names that page.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
