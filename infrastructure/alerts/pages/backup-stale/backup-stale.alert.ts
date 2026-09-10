import type { Alert } from "../../alert.page-type.types.ts"

export const backupStale = {
  id: "01a06755-62f8-76a9-9ddd-9e1212a02a26",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "backup-stale",
  title: "Backup stale",
  definition: "no backup has completed for longer than is allowed",
  domain: "infrastructure",
  summary: "Backup CronJob {{ $labels.cronjob }} has not succeeded within 1.5x its own schedule",
  runbook: "txt",
} as const satisfies Alert
