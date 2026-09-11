import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const internalPort = {
  id: "01a09095-0971-7e89-b75c-e674e97797c4",
  type: "number-property",
  slug: "internal-port",
  propertySlug: "internal-port",
  definition: "the port a service listens on behind the port it is fronted at",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service the pool fronts states this port.",
    },
    {
      invariantKind: "absence",
      statement: "A service nothing fronts states no such port.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
