import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Replicas = number

export const replicas = {
  id: "01a05b26-f8b6-7a90-82f8-63a141d99dab",
  pageTypeSlug: "number-property",
  slug: "replicas",
  propertySlug: "replicas",
  definition: "how many pods a workload is asked to keep",
  max: 100,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workload asked for no pods is stopped rather than taken away.",
    },
  ],
} as const satisfies NumberProperty
