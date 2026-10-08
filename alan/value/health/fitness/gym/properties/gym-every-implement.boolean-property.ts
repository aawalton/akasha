import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const gymEveryImplement = {
  id: "01a11b34-da16-775b-9ff0-976caf963bad",
  type: "page-type/boolean-property",
  slug: "gym-every-implement",
  propertySlug: "every-implement",
  definition: "whether a gym holds every implement a movement can name",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A gym holding every implement loads every movement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gym holding every implement has no top load, so no weight there is held.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
