import type { Manifest } from "@akasha/k8s-types/manifest"

export const authProxyManifests = {
  id: "01a07383-6af4-7b2a-9679-bdc53aceb125",
  pageTypeSlug: "manifest",
  slug: "auth-proxy-manifests",
  definition: "the namespace, the deployment reading a request's session and the way in to it",
  code: "ts",
} as const satisfies Manifest
