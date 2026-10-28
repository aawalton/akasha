import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const activeSlots = {
  id: "01a17ff8-40fb-7724-9db7-7fa5bdb6146e",
  type: "page-type/number-property",
  slug: "active-slots",
  propertySlug: "active-slots",
  definition: "how many abilities of one kind a character works on at once",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kind stating no count holds no slots, and its abilities are used rather than taken up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every held ability of a kind with slots holds one, unless it is set aside or completed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability set aside is taken up again only while a slot of its kind is free.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T00:45:38.427Z",
  updatedAt: "2026-10-28T00:45:38.427Z",
} as const satisfies NumberProperty
