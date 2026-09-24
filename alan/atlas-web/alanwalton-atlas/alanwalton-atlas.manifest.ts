import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const alanwaltonAtlas = {
  id: "01a07382-cc82-70f9-994d-20709df7bec4",
  type: "page-type/manifest",
  slug: "alanwalton-atlas",
  definition: "the deployment and service drawing Alan's map and taking in his phone's locations",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "The map reaches no object store, and draws its pins on no basemap of its own.",
    },
  ],
} as const satisfies Manifest
