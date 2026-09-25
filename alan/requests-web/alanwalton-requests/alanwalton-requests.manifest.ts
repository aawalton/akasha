import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const alanwaltonRequests = {
  id: "01a0c537-bb9a-7f52-80cb-5669e5691b07",
  type: "page-type/manifest",
  slug: "alanwalton-requests",
  definition: "the deployment and service drawing the Requests site",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod runs the image the deployed commit was built into, and builds nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The pod template carries the hash of no secret.",
    },
  ],
} as const satisfies Manifest
