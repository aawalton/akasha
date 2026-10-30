import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const surplus = {
  id: "01a07c5c-cffc-7e06-993e-f7b533204f65",
  type: "page-type/route",
  slug: "surplus",
  definition: "the stoplights a readout widget shows for Alan's surplus",
  code: "ts",
  test: "ts",
  urlPath: "api/surplus",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group of readings served is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading's color is the rung that reading reaches on the scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus is Alan's sleep less the cost of Alan's day so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus lives in tracking rows no pod can see.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is carried in rather than taken here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group with nothing carried in answers a stoplight with no figure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty figure keeps hours Alan does not have off the ring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
  ],
  createdAt: "2026-09-07T14:54:12.476Z",
  updatedAt: "2026-10-30T17:04:20.295Z",
} as const satisfies Route
