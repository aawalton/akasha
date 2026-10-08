import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxCpuMillicores = {
  id: "01a0d5a5-6667-7e8f-95cc-3b74b26568a6",
  type: "page-type/number-property",
  slug: "max-cpu-millicores",
  propertySlug: "max-cpu-millicores",
  definition: "the most processor a container may use at once, in thousandths of a processor",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "These thousandths are the processor limit Kubernetes states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container at these thousandths is slowed rather than ended.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T22:59:41.799Z",
  updatedAt: "2026-09-24T23:00:04.000Z",
} as const satisfies NumberProperty
