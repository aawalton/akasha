import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkingMemory = string

export const workingMemory = {
  id: "01a058a3-b01f-7001-b5ea-42397354ef37",
  pageTypeSlug: "text-property",
  slug: "working-memory",
  propertySlug: "working-memory",
  definition: "the state of the work on one intent",
  max: 500,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Working memory is emptied when its intent leaves.",
    },
  ],
} as const satisfies TextProperty
