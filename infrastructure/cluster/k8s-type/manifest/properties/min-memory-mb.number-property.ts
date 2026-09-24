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
} as const satisfies NumberProperty
