import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const changeMaxCpuSeconds = {
  id: "01a0914e-bc25-767c-b5aa-e07718e377e5",
  type: "number-property",
  slug: "change-max-cpu-seconds",
  propertySlug: "max-cpu-seconds",
  definition: "the most processor time one run of a change may spend, in seconds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change stating no seconds here is allowed the seconds the runner names.",
    },
    {
      invariantKind: "departure",
      statement: "These seconds are counted on the processor rather than on the wall clock.",
    },
    {
      invariantKind: "departure",
      statement: "A change past these seconds runs to its end and then keeps nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds a change reaches spend count against the change reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "Alan settles a raise rather than the agent the ceiling refused.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
