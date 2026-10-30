import type { ReadoutGroup } from "akasha/alan/harness/readout/group/readout-group.page-type.types.ts"

export const categorization = {
  id: "01a05455-7631-7e29-b225-b04ee2ae4890",
  type: "page-type/readout-group",
  slug: "categorization",
  definition: "how many Monarch transactions of a year wait for a person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The backlog counted is a year's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The intake the backlog is measured against is a month's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The feed also sends the year's total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No tile draws the year's total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tap opens Monarch filtered only where Monarch was not already running.",
    },
  ],
  createdAt: "2026-08-30T20:21:22.097Z",
  updatedAt: "2026-10-30T16:07:12.292Z",
} as const satisfies ReadoutGroup
