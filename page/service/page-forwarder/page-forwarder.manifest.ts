import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const pageForwarder = {
  id: "01a0738a-b8a8-7ed0-b30c-fb54c86490a9",
  type: "page-type/manifest",
  slug: "page-forwarder",
  definition:
    "the socat forwarder workload, its namespace, the way in to it and the network policies around it",
  code: "ts",
  minCpuMillicores: 10,
  minMemoryMb: 32,
  killMemoryMb: 64,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The forwarder carries at most 24 connections at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A connection past those waits its turn rather than being carried.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each connection carried is a process, and too many end the forwarder for all.",
    },
  ],
  createdAt: "2026-09-05T21:47:46.216Z",
  updatedAt: "2026-10-20T13:51:49.756Z",
} as const satisfies Manifest
