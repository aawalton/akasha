import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ContainerPort = number

export const containerPort = {
  id: "01a05b26-f8b6-79b3-99f7-89dda59659cc",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "container-port",
  propertySlug: "container-port",
  definition: "the port a workload's container listens on",
  max: 65535,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Traffic reaching the container from inside the cluster arrives here.",
    },
  ],
} as const satisfies NumberProperty
