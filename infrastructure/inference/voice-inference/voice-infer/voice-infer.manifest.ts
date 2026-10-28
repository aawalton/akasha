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
      decisionKind: "decision-kind/departure",
      statement:
        "The workload writes a narration's pieces to the pod's own disk, not to an object store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The speech the workload keeps sits on a volume of its own, apart from the pieces.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The speech kept goes when the pod is replaced.",
    },
  ],
  createdAt: "2026-09-05T21:18:28.773Z",
  updatedAt: "2026-10-28T16:36:07.019Z",
} as const satisfies Manifest
