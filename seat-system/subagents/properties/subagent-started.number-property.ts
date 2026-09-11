import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const subagentStarted = {
  id: "01a08e51-10e7-7934-9e6b-b8a1583bd481",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "subagent-started",
  propertySlug: "started",
  definition: "the moment a subagent's run last began, in milliseconds",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run beginning writes the moment that run began here.",
    },
    {
      invariantKind: "departure",
      statement: "A moment later than the stop asked for says the run began again after that stop.",
    },
    {
      invariantKind: "departure",
      statement: "A page saying nothing here is taken away by the stop asked for.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
