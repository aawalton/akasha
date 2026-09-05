import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsBackupBulk = {
  id: "01a07384-ea81-74b1-b26a-b9a2892c9da9",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-backup-bulk",
  definition:
    "the namespace, the disk and the cron job copying the logs, agent sessions and network database off",
  code: "ts",
} as const satisfies Manifest
