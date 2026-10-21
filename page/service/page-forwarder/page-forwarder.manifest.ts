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
  killMemoryMb: 256,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The forwarder asks socat to carry at most 24 connections at once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Under a burst socat carries hundreds of connections at once all the same.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each connection carried is a process, and too many end the forwarder for all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The forwarder's memory ceiling holds a burst of a thousand connections.",
    },
  ],
  createdAt: "2026-09-05T21:47:46.216Z",
  updatedAt: "2026-10-21T14:38:56.908Z",
} as const satisfies Manifest
