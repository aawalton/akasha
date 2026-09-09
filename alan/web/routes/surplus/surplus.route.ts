import type { Route } from "@akasha/code/route"

export const surplus = {
  id: "01a07c5c-cffc-7e06-993e-f7b533204f65",
  pageTypeSlug: "route",
  type: "route",
  slug: "surplus",
  definition: "Alan's surplus as the color the hours left in his night reach",
  code: "ts",
  test: "ts",
  urlPath: "api/surplus",
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
      statement: "The surplus is Alan's sleep less the cost of Alan's day so far.",
    },
    {
      invariantKind: "departure",
      statement: "The surplus lives in tracking rows no pod can see.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is carried in rather than taken here.",
    },
    {
      invariantKind: "departure",
      statement: "A group with nothing carried in answers a stoplight with no figure.",
    },
    {
      invariantKind: "departure",
      statement: "An empty figure keeps hours Alan does not have off the ring.",
    },
    {
      invariantKind: "departure",
      statement: "Only a group no readout is left in answers 503.",
    },
  ],
} as const satisfies Route
