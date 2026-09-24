import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const told = {
  id: "01a0a577-6d6c-764c-9532-d688d37182a7",
  type: "page-type/boolean-property",
  slug: "told",
  propertySlug: "told",
  definition: "whether a persona is told a service is broken",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating nothing is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating false is told to nobody, the persona stated instead included.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating false is looked at and left a verdict as any service is.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
