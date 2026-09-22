import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const stateSpawnedSeat = {
  id: "01a06983-278f-7ddb-8d5a-076c8293a894",
  type: "page-type/module",
  slug: "state-spawned-seat",
  definition: "the attributes with which a spawned seat is stated",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stating module is imported from beside this module and its function called.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No command is spawned to state a spawned seat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No ceiling bounds a stating.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mode or a principal the stating would refuse is refused before anything runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stating's refusal is answered as the refusal's own words.",
    },
  ],
} as const satisfies Module
