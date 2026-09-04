import type { Manifest } from "@akasha/k8s-types/manifest"

export const cnpgScheduledBackup = {
  id: "01a06810-1262-73c8-bc67-275c9593daf3",
  pageTypeSlug: "manifest",
  slug: "cnpg-scheduled-backup",
  definition: "the daily backup the database operator takes",
  code: "ts",
} as const satisfies Manifest
