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
} as const satisfies Manifest
