import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const esoRigManifests = {
  id: "01a07388-b696-775a-af9a-6aac114588cd",
  type: "page-type/manifest",
  slug: "eso-rig-manifests",
  definition:
    "the privileged GPU workload running the Elder Scrolls Online client and the namespace holding it",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
