import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const archiveOfWorldsWebManifests = {
  id: "01a07386-d26c-7d50-bdea-a23537e414e6",
  pageTypeSlug: "manifest",
  slug: "archive-of-worlds-web-manifests",
  definition: "the deployment and service serving the site published original stories are read on",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
