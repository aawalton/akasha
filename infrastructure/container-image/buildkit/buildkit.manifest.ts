import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const buildkit = {
  id: "01a07383-de17-7590-8580-ccd38e33ccd8",
  type: "page-type/manifest",
  slug: "buildkit",
  definition: "the deployment running the builder that turns a Dockerfile into an image",
  code: "ts",
  minCpuMillicores: 4000,
  minMemoryMb: 20480,
  killMemoryMb: 20480,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pod template carries the hash of the buildkit-config configmap.",
    },
  ],
} as const satisfies Manifest
