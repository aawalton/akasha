import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const restartsItself = {
  id: "01a0ca3d-01c0-739a-8d70-ecc6dfd5642f",
  type: "page-type/boolean-property",
  slug: "restarts-itself",
  propertySlug: "restarts-itself",
  definition: "whether a deploy leaves a service to end itself where that service is ready",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy restarts a service stating nothing here as that deploy lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating true here is left running until that service leaves itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating true here reaches a point it calls safe without being asked.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A service reaching no such point goes on running the code that service loaded.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
