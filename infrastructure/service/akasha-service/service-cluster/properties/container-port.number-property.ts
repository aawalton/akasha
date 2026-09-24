import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const containerPort = {
  id: "01a05b26-f8b6-79b3-99f7-89dda59659cc",
  type: "page-type/number-property",
  slug: "container-port",
  propertySlug: "container-port",
  definition: "a workload's container port",
  max: 65535,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Traffic reaching the container from inside the cluster arrives here.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
