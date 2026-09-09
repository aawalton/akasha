import type { Route } from "@akasha/code/route"

export const safetyLevel = {
  id: "01a08245-3127-74f2-8f5d-ac9cc9ef6bb1",
  pageTypeSlug: "route",
  type: "route",
  slug: "safety-level",
  definition: "Alan's safety as the color the level he is at reaches",
  code: "ts",
  test: "ts",
  urlPath: "api/safety-level",
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
      statement: "The level lives in tracking rows no pod can see.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is taken on Alan's workstation and carried in.",
    },
    {
      invariantKind: "departure",
      statement: "A group with nothing carried in answers a stoplight with no figure.",
    },
    {
      invariantKind: "departure",
      statement: "`readingHeld` names whether nothing was ever carried or what came went stale.",
    },
    {
      invariantKind: "departure",
      statement: "An empty figure keeps a level nobody has off the ring.",
    },
    {
      invariantKind: "departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "The shipped widget fails its whole decode on an empty `stoplights` list.",
    },
    {
      invariantKind: "departure",
      statement: "The shipped widget fails its whole decode on a tier outside its six colors.",
    },
  ],
} as const satisfies Route
