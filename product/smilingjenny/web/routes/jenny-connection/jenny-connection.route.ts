import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyConnection = {
  id: "01a13586-7a6d-7a51-84fa-e9ec3de05aec",
  type: "page-type/route",
  slug: "jenny-connection",
  definition: "Alan's connection with Jenny as the stoplight Jenny's tile draws",
  code: "ts",
  test: "ts",
  urlPath: "api/connection",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group of readings served is the one whose page names this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's label, wire key and scale are read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout with no reading answers a stoplight with no figure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Jenny's widget decodes `stoplights` as a list holding at least one stoplight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readings this route's tests read are fixtures rather than Alan's own.",
    },
  ],
  createdAt: "2026-10-13T13:49:28.044Z",
  updatedAt: "2026-10-13T13:49:28.044Z",
} as const satisfies Route
