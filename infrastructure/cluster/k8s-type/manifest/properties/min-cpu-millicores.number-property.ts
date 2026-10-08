import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const minCpuMillicores = {
  id: "01a0d5a5-6668-7886-a2e2-069f8b744207",
  type: "page-type/number-property",
  slug: "min-cpu-millicores",
  propertySlug: "min-cpu-millicores",
  definition: "the processor a container is promised, in thousandths of a processor",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "These thousandths are the processor request Kubernetes states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container is placed only on a node with this much processor unpromised.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T22:59:41.800Z",
  updatedAt: "2026-09-24T23:00:04.000Z",
} as const satisfies NumberProperty
