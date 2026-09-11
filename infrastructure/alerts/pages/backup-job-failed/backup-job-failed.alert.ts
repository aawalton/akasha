import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const backupJobFailed = {
  id: "01a06755-62f8-7bdc-8067-6948a85ec910",
  type: "alert",
  slug: "backup-job-failed",
  title: "Backup job failed",
  definition: "a backup job finished without succeeding",
  domain: "infrastructure",
  summary: "Backup job {{ $labels.job_name }} failed in {{ $labels.namespace }}",
  runbook: "txt",
} as const satisfies Alert
