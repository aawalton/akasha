import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const authProxyManifests = {
  id: "01a07383-6af4-7b2a-9679-bdc53aceb125",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "auth-proxy-manifests",
  definition: "the namespace, the deployment reading a request's session and the way in to it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
