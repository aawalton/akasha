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
      statement: "The forwarder asks socat to carry at most 128 connections at once.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A web app's follow holds its connection open for as long as the follow runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cap leaves room for an ask beside every follow the web apps hold open.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "socat before 1.8.1 lets more connections through than its cap once one ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The forwarder runs a socat that holds its cap, so a burst waits its turn.",
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
  updatedAt: "2026-10-22T15:16:29.990Z",
} as const satisfies Manifest
