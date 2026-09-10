import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const gitTransportManifests = {
  id: "01a07385-11fa-700e-9c7d-639aebf648f7",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "git-transport-manifests",
  definition: "the namespace, the disk the repositories sit on and the deployment serving them",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
