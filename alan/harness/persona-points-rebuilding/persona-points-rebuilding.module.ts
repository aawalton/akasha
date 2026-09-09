import type { Module } from "@akasha/code/module"

export const personaPointsRebuilding = {
  id: "01a082eb-4f25-7bd5-b488-a5c24903072e",
  pageTypeSlug: "module",
  type: "module",
  slug: "persona-points-rebuilding",
  definition: "each persona's points, worked out again from the days her messages were counted on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The points before today are the messages over the counted days short of today.",
    },
    {
      invariantKind: "departure",
      statement: "The day now open is counted from six in the morning in New York.",
    },
    {
      invariantKind: "departure",
      statement: "Today itself is left out of the points before today.",
    },
    {
      invariantKind: "departure",
      statement: "Today's points are the messages on today's own day.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's three figures agree once the rebuild ends.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to only today has nothing before today.",
    },
    {
      invariantKind: "departure",
      statement: "A name no persona is filed under is said rather than kept against nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to on no counted day keeps the figure she already had.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rebuild is run by a workstation timer once the day has opened as well as by hand.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out the rung a total reaches.",
    },
  ],
} as const satisfies Module
