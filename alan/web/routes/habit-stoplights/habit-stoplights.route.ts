import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const habitStoplights = {
  id: "01a08244-2b4d-7457-92af-ca9ba4b41c4d",
  pageTypeSlug: "route",
  type: "route",
  slug: "habit-stoplights",
  definition: "Alan's upkeep as the colors its readings reach",
  code: "ts",
  urlPath: "api/habit-stoplights",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The group of readings served is the one thing named here.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "A reading's color is the rung that reading reaches on the scale.",
    },
    {
      invariantKind: "departure",
      statement: "A readout joining the group reaches the tile without this route changing.",
    },
    {
      invariantKind: "departure",
      statement: "A readout with no fresh reading answers a stoplight with no figure.",
    },
    {
      invariantKind: "departure",
      statement:
        "`readingHeld` names whether no reading was ever taken or the one taken went stale.",
    },
    {
      invariantKind: "departure",
      statement: "The tile keeps its full count of six rings where no reading has come in yet.",
    },
    {
      invariantKind: "departure",
      statement: "An empty figure names a missing reading, and the color never names it.",
    },
    {
      invariantKind: "departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "The widget reads a 503 as no signal.",
    },
  ],
} as const satisfies Route
