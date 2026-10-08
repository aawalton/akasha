import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const itemQuantity = {
  id: "01a0f1e8-8f5f-7def-86fe-9403ec8c6de8",
  type: "page-type/number-property",
  slug: "item-quantity",
  propertySlug: "quantity",
  definition: "how many of one item a character has or a place holds",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item stating no quantity is one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Many of one thing are one item stating how many, never many pages.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-30T10:42:25.247Z",
  updatedAt: "2026-09-30T10:42:30.000Z",
} as const satisfies NumberProperty
