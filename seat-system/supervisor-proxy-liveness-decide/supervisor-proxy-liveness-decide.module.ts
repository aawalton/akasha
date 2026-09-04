import type { Module } from "@akasha/code-system/module"

export const supervisorProxyLivenessDecide = {
  id: "01a06838-5a84-7005-8c03-97e98844c99e",
  pageTypeSlug: "module",
  slug: "supervisor-proxy-liveness-decide",
  definition: "what a supervisor does as the OAuth proxy fails its health checks",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One healthy check clears every failure and every respawn counted so far.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy is respawned only after three checks in a row failed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Three respawns in a row that never reached health is where the supervisor gives up.",
    },
    {
      invariantKind: "departure",
      statement: "A supervisor that gave up counts no further failure and acts no further.",
    },
    {
      invariantKind: "departure",
      statement: "A respawn clears the failure count and raises the respawn count.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here checks health or spawns a proxy.",
    },
  ],
} as const satisfies Module
