import type { Manifest } from "akasha/infrastructure/cluster/k8s-types/manifests/manifest.page-type.types.ts"

export const seaweedfsBackupCnpg = {
  id: "01a07386-60c1-7d78-b901-14160ffce256",
  pageTypeSlug: "manifest",
  type: "manifest",
  slug: "seaweedfs-backup-cnpg",
  definition:
    "the namespace, the disk and the cron job copying the Postgres backups off to separate storage",
  code: "ts",
  generatedDirectory: true,
} as const satisfies Manifest
