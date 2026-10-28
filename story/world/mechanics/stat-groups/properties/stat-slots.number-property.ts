import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const statSlots = {
  id: "01a182ff-5fcd-76d5-af3f-5ba1c00e392a",
  type: "page-type/number-property",
  slug: "stat-slots",
  propertySlug: "stat-slots",
  definition: "how many stats of one group a character may hold",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A group stating slots shows how many it holds out of them.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T14:52:16.716Z",
  updatedAt: "2026-10-28T14:52:16.716Z",
} as const satisfies NumberProperty
