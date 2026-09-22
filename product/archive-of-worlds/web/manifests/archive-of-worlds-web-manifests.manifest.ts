import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const archiveOfWorldsWebManifests = {
  id: "01a07386-d26c-7d50-bdea-a23537e414e6",
  type: "page-type/manifest",
  slug: "archive-of-worlds-web-manifests",
  definition: "the deployment and service serving the site of published original stories",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
