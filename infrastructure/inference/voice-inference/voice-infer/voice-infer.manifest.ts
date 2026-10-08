import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const voiceInfer = {
  id: "01a0736f-e7a5-75ee-bda8-4298c8084c5b",
  type: "page-type/manifest",
  slug: "voice-infer",
  definition: "the speech workload, its namespace and the way in to it",
  code: "ts",
  minCpuMillicores: 2000,
  maxCpuMillicores: 4000,
  minMemoryMb: 4096,
  killMemoryMb: 4096,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The workload writes no audio anywhere, and reaches no object store.",
    },
  ],
  createdAt: "2026-09-05T21:18:28.773Z",
  updatedAt: "2026-09-24T23:15:06.000Z",
} as const satisfies Manifest
