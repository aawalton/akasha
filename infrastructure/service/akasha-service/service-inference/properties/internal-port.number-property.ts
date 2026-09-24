import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const internalPort = {
  id: "01a09095-0971-7e89-b75c-e674e97797c4",
  type: "page-type/number-property",
  slug: "internal-port",
  propertySlug: "internal-port",
  definition: "a service's own port behind the port callers use",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service the pool fronts states this port.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A service nothing fronts states no such port.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
