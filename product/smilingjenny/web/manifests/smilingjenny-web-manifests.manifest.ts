import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const smilingjennyWebManifests = {
  id: "01a0738a-19b1-7fe7-872a-08b04bd574dd",
  type: "page-type/manifest",
  slug: "smilingjenny-web-manifests",
  definition: "the deployment and service running Jenny's command center",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
} as const satisfies Manifest
