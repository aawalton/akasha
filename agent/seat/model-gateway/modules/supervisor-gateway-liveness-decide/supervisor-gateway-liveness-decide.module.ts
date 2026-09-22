import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorGatewayLivenessDecide = {
  id: "01a06838-5a84-7005-8c03-97e98844c99e",
  type: "page-type/module",
  slug: "supervisor-gateway-liveness-decide",
  definition: "what a supervisor does as the OAuth proxy fails its health checks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One healthy check clears every failure and every respawn counted so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A proxy is respawned only after three checks in a row failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Three respawns in a row that never reached health is where the supervisor gives up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor that gave up counts no further failure and acts no further.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A respawn clears the failure count and raises the respawn count.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here checks health or spawns a proxy.",
    },
  ],
} as const satisfies Module
