import type { Manifest } from "@akasha/k8s-types/manifest"

export const gitTransportManifests = {
  id: "01a07385-11fa-700e-9c7d-639aebf648f7",
  pageTypeSlug: "manifest",
  slug: "git-transport-manifests",
  definition: "the namespace, the disk the repositories sit on and the deployment serving them",
  code: "ts",
} as const satisfies Manifest
