import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const resourcesStoplights = {
  id: "01a14f3c-934e-78dc-a700-518ac1a969d2",
  type: "page-type/route",
  slug: "resources-stoplights",
  definition: "Alan's resources as the colors their readings reach",
  code: "ts",
  urlPath: "api/resources-stoplights",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group of readings served is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's label is the one its page states for that group.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout with no reading answers a stoplight with no figure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
  ],
  createdAt: "2026-10-18T13:38:52.365Z",
  updatedAt: "2026-10-18T13:38:52.365Z",
} as const satisfies Route
