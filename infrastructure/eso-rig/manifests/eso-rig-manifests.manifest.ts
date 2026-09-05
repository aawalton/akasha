import type { Manifest } from "@akasha/k8s-types/manifest"

export const esoRigManifests = {
  id: "01a07388-b696-775a-af9a-6aac114588cd",
  pageTypeSlug: "manifest",
  slug: "eso-rig-manifests",
  definition:
    "the privileged GPU workload running the Elder Scrolls Online client and the namespace holding it",
  code: "ts",
} as const satisfies Manifest
