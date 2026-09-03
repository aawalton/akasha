import type { FileProperty } from "@akasha/pages-system/file-property"

export type Simulation = "py"

export const simulation = {
  id: "01a0657f-a729-7667-bb50-f50d5da51399",
  pageTypeSlug: "file-property",
  slug: "simulation",
  propertySlug: "simulation",
  definition: "the computation a model is, written in Python",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A simulation prints its numbers rather than writing the numbers anywhere.",
    },
  ],
} as const satisfies FileProperty
