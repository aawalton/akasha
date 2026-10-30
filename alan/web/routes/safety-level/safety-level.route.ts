import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const safetyLevel = {
  id: "01a08245-3127-74f2-8f5d-ac9cc9ef6bb1",
  type: "page-type/route",
  slug: "safety-level",
  definition: "the stoplights a readout widget shows for Alan's safety level",
  code: "ts",
  test: "ts",
  urlPath: "api/safety-level",
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
      statement: "The level lives in tracking rows no pod can see.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is taken on Alan's workstation and carried in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group with nothing carried in answers a stoplight with no figure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty figure keeps a level nobody has off the ring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shipped widget fails its whole decode on an empty `stoplights` list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shipped widget fails its whole decode on a tier outside its six colors.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`readingHeld` says nothing was ever carried.",
    },
  ],
  createdAt: "2026-09-08T18:26:07.783Z",
  updatedAt: "2026-10-30T17:03:32.121Z",
} as const satisfies Route
