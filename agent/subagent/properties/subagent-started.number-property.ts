import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const subagentStarted = {
  id: "01a08e51-10e7-7934-9e6b-b8a1583bd481",
  type: "page-type/number-property",
  slug: "subagent-started",
  propertySlug: "started",
  definition: "the time the last run of a subagent starts",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run beginning writes the moment that run began here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment later than the stop asked for says the run began again after that stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page saying nothing here is taken away by the stop asked for.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T02:34:32.551Z",
  updatedAt: "2026-10-30T14:36:49.562Z",
} as const satisfies NumberProperty
