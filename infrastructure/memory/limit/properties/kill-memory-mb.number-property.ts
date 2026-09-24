import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const killMemoryMb = {
  id: "01a0d5a5-6668-718b-be30-fd774c599619",
  type: "page-type/number-property",
  slug: "kill-memory-mb",
  propertySlug: "kill-memory-mb",
  definition: "the memory past which a thing is ended, in megabytes",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing past these megabytes is ended rather than slowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A megabyte here is two to the twentieth bytes, as every memory ceiling's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A container's is the memory limit Kubernetes states, and a unit's is `MemoryMax`.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
