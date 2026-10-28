import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const alignment = {
  id: "01a17ffa-1110-725b-a0c4-1e4066b9c933",
  type: "page-type/select-property",
  slug: "alignment",
  propertySlug: "alignment",
  definition: "the edge a panel lines up with across its dock",
  values: ["screen-edge", "previous-panel"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel stating no alignment lines up with the screen edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel lined up with the previous panel shares that panel's inner edge.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T00:47:37.231Z",
  updatedAt: "2026-10-28T00:47:37.231Z",
} as const satisfies SelectProperty
