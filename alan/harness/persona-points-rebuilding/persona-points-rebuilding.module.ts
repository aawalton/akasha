import type { Module } from "@akasha/code/module"

export const personaPointsRebuilding = {
  id: "01a082eb-4f25-7bd5-b488-a5c24903072e",
  pageTypeSlug: "module",
  slug: "persona-points-rebuilding",
  definition: "each persona's points before today, worked out again from the days before today",
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
      statement: "Today itself is left out.",
    },
    {
      invariantKind: "departure",
      statement: "Today's own points are left as they were kept.",
    },
    {
      invariantKind: "departure",
      statement: "A name no persona is filed under is said rather than kept against nobody.",
    },
    {
      invariantKind: "departure",
      statement: "A persona written to on no counted day keeps the figure she already carried.",
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
