import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const audhdalanWebManifests = {
  id: "01a07388-768e-7f43-89ee-b66e2a21d046",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "audhdalan-web-manifests",
  definition: "the deployment and service serving the site Alan's neurodiversity writing is on",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
