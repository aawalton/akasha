import type { Manifest } from "@akasha/k8s-types/manifest"

export const audhdalanWebManifests = {
  id: "01a07388-768e-7f43-89ee-b66e2a21d046",
  pageTypeSlug: "manifest",
  slug: "audhdalan-web-manifests",
  definition: "the deployment and service serving the site Alan's neurodiversity writing is on",
  code: "ts",
} as const satisfies Manifest
