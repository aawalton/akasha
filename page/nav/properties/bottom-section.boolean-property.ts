import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const bottomSection = {
  id: "01a0d8fc-03bb-71d9-be4d-f644f3905c28",
  type: "page-type/boolean-property",
  slug: "bottom-section",
  propertySlug: "bottom-section",
  definition: "whether a nav item heads a section at the foot of its app's navigation",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The nav items under a nav item heading a bottom section sit in that section.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
