import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type Port = number

export const port = {
  id: "01a05a3f-b42c-7733-9676-76de6ffa5b35",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "port",
  propertySlug: "port",
  definition: "the port a service listens on",
  max: 65535,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service listening states its port.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating no port listens nowhere.",
    },
  ],
} as const satisfies NumberProperty
