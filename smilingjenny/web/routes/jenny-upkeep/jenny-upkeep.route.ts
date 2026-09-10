import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const jennyUpkeep = {
  id: "01a08bee-4262-784b-b397-8a5a0ad37433",
  pageTypeSlug: "route",
  type: "route",
  slug: "jenny-upkeep",
  definition: "Alan's upkeep as the stoplights Jenny's tile draws those readings in",
  code: "ts",
  test: "ts",
  urlPath: "api/upkeep",
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
      statement: "A readout's label and wire key are read off that readout's page.",
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
      statement: "The readings served here are Alan's rather than Jenny's.",
    },
    {
      invariantKind: "departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      invariantKind: "departure",
      statement: "A readout with no fresh reading answers a stoplight with no figure.",
    },
    {
      invariantKind: "departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "constraint",
      statement:
        "Jenny's shipped widget decodes `stoplights` as a list holding at least one stoplight.",
    },
    {
      invariantKind: "constraint",
      statement: "Jenny's shipped widget decodes a stoplight's tier as one of six color names.",
    },
    {
      invariantKind: "departure",
      statement: "The readings this route's tests read are fixtures rather than Alan's own.",
    },
    {
      invariantKind: "departure",
      statement: "`readingHeld` says no reading was ever taken.",
    },
  ],
} as const satisfies Route
