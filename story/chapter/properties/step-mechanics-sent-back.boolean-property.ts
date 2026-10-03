import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const stepMechanicsSentBack = {
  id: "01a102f0-b0b7-7955-a531-3a7b1480b8a8",
  type: "page-type/boolean-property",
  slug: "step-mechanics-sent-back",
  propertySlug: "mechanics-sent-back",
  definition:
    "whether the mechanics step has once sent a turn or written chapter back to its game master",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mechanics step's send-back sets it, and nothing but a new turn or chapter clears it.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
