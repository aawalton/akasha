import type { Manifest } from "@akasha/k8s-types/manifest"

export const archiveOfWorldsWebManifests = {
  id: "01a07386-d26c-7d50-bdea-a23537e414e6",
  pageTypeSlug: "manifest",
  slug: "archive-of-worlds-web-manifests",
  definition: "the deployment and service serving the site published original stories are read on",
  code: "ts",
} as const satisfies Manifest
