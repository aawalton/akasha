import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const audhdalanWebManifests = {
  id: "01a07388-768e-7f43-89ee-b66e2a21d046",
  type: "page-type/manifest",
  slug: "audhdalan-web-manifests",
  definition: "the deployment and service serving the site of Alan's neurodiversity writing",
  code: "ts",
  minCpuMillicores: 100,
  maxCpuMillicores: 500,
  minMemoryMb: 512,
  killMemoryMb: 512,
  generatedDirectory: true,
} as const satisfies Manifest
