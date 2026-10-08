import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const minMemoryMb = {
  id: "01a0d5a5-6668-7dea-a63c-dd5cc63900d4",
  type: "page-type/number-property",
  slug: "min-memory-mb",
  propertySlug: "min-memory-mb",
  definition: "the memory a container is promised, in megabytes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "These megabytes are the memory request Kubernetes states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A container is placed only on a node with this much memory unpromised.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T22:59:41.800Z",
  updatedAt: "2026-09-24T23:00:04.000Z",
} as const satisfies NumberProperty
