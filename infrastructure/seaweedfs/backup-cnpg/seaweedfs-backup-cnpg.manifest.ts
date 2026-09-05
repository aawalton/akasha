import type { Manifest } from "@akasha/k8s-types/manifest"

export const seaweedfsBackupCnpg = {
  id: "01a07386-60c1-7d78-b901-14160ffce256",
  pageTypeSlug: "manifest",
  slug: "seaweedfs-backup-cnpg",
  definition:
    "the namespace, the disk and the cron job copying the Postgres backups off to separate storage",
  code: "ts",
} as const satisfies Manifest
