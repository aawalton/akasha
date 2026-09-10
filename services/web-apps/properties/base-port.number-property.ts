import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const basePort = {
  id: "01a08cfa-c5f4-7b3f-80e6-1a9623e9954d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "base-port",
  propertySlug: "base-port",
  definition: "the port a web app's dev server counts up from",
  max: 65535,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The port is stated on the page rather than written into the code that starts the dev server.",
    },
    {
      invariantKind: "departure",
      statement: "A hundred ports from the base port belong to the web app stating the base port.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
