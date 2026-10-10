import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questPortBreadcrumbProbe = {
  id: "01a12618-7795-7d76-af46-2a9e44298023",
  type: "page-type/module",
  slug: "quest-port-breadcrumb-probe",
  definition:
    "the asking again, on other maps, where a quest objective is after a breadcrumb answer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A press whose answer is a breadcrumb asks again on other maps before it ports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The maps asked are the objective's own, each map out to the zone, and the quest's zone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The map the player is on is asked last, with where the player is on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The maps are asked one at a time, and an answer not given in 1.5 seconds is given up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new press drops a probe still asking, and the old press then ports nowhere.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No probe answer changes where the press ports.",
    },
  ],
  createdAt: "2026-10-10T13:55:00.117Z",
  updatedAt: "2026-10-10T13:55:00.117Z",
} as const satisfies Module
