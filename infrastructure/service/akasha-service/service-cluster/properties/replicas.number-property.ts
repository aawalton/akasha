import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const replicas = {
  id: "01a05b26-f8b6-7a90-82f8-63a141d99dab",
  type: "page-type/number-property",
  slug: "replicas",
  propertySlug: "replicas",
  definition: "how many pods a workload is asked to keep",
  max: 100,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A workload asked for no pods is stopped rather than taken away.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T04:07:55.830Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies NumberProperty
