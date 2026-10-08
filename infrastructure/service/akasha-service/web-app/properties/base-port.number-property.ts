import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const basePort = {
  id: "01a08cfa-c5f4-7b3f-80e6-1a9623e9954d",
  type: "page-type/number-property",
  slug: "base-port",
  propertySlug: "base-port",
  definition: "the port from which a web app's dev server counts up",
  max: 65535,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The port is stated on the page rather than written into the code that starts the dev server.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hundred ports from the base port belong to the web app stating the base port.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-10T20:20:40.052Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies NumberProperty
