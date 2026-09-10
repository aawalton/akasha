import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const seaweedfsBackupAssets = {
  id: "01a07383-16d2-7fb8-aa65-d8a380cac6a5",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "seaweedfs-backup-assets",
  definition:
    "the namespace, the disk and the cron job copying the stored assets off to separate storage",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
