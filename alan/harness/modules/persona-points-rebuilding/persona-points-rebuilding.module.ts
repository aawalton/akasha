import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaPointsRebuilding = {
  id: "01a082eb-4f25-7bd5-b488-a5c24903072e",
  type: "page-type/module",
  slug: "persona-points-rebuilding",
  definition: "each persona's points, worked out again from the days her messages were counted on",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The points before today are the messages over the counted days short of today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day now open is counted from six in the morning in New York.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Today itself is left out of the points before today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Today's points are the messages on today's own day.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona's three figures agree once the rebuild ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A persona written to only today has nothing before today.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name no persona is filed under is said rather than kept against nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A persona written to on no counted day keeps the figure that persona already had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The rebuild is run by a workstation timer once the day has opened as well as by hand.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each persona rebuilt is named as soon as that persona's points are kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run hands the list it was handed down, so a run that threw names each persona it rebuilt.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out the rung a total reaches.",
    },
  ],
} as const satisfies Module
