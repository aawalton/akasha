import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const port = {
  id: "01a05a3f-b42c-7733-9676-76de6ffa5b35",
  type: "page-type/number-property",
  slug: "port",
  propertySlug: "port",
  definition: "a service's port",
  max: 65535,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service listening states its port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating no port listens nowhere.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
