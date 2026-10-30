import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const memoryOwed = {
  id: "01a18d3f-ce8f-7d0d-a4c3-dd8f7431fc72",
  type: "page-type/boolean-property",
  slug: "memory-owed",
  propertySlug: "memory-owed",
  definition: "whether a one-seat turn at player still owes its memory",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating nothing here owes no memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A one-seat turn states this as it reaches player, and its memory landing clears it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn owing its memory is at player, so the player reads it while its memory is owed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The turn after a turn owing its memory is made, and waits until that memory lands.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-30T14:38:51.533Z",
  updatedAt: "2026-10-30T14:38:51.533Z",
} as const satisfies BooleanProperty
