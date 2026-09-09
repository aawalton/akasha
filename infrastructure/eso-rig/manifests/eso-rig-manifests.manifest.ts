import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.ts"

export const esoRigManifests = {
  id: "01a07388-b696-775a-af9a-6aac114588cd",
  pageTypeSlug: "manifest",
  slug: "eso-rig-manifests",
  definition:
    "the privileged GPU workload running the Elder Scrolls Online client and the namespace holding it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
