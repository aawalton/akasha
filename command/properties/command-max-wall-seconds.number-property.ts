import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const commandMaxWallSeconds = {
  id: "01a0820f-feb2-79e4-8435-06a161f3c6ab",
  type: "page-type/number-property",
  slug: "command-max-wall-seconds",
  propertySlug: "max-wall-seconds",
  definition: "how many seconds a command may run before the call is stopped",
  nullable: true,
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command stating no seconds here is allowed the seconds the wrapper names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command stating null here runs under no ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "These seconds are counted on the wall clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call stopped is ended rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command reaching for a slow thing states the seconds that thing takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan settles a raise rather than the agent the ceiling stopped.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-08T17:28:01.458Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
