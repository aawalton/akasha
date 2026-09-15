import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const habitStoplights = {
  id: "01a08244-2b4d-7457-92af-ca9ba4b41c4d",
  type: "page-type/route",
  slug: "habit-stoplights",
  definition: "Alan's upkeep as the colors its readings reach",
  code: "ts",
  urlPath: "api/habit-stoplights",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The group of readings served is the one thing named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading's color is the rung that reading reaches on the scale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout joining the group reaches the tile without this route changing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A readout with no fresh reading answers a stoplight with no figure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "`readingHeld` names whether no reading was ever taken or the reading taken went stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tile keeps its full count of six rings where no reading has come in yet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty figure names a missing reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color never names a missing reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The widget reads a 503 as no signal.",
    },
  ],
} as const satisfies Route
