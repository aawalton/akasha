import type { Alert } from "../alert.page-type.ts"

export const backupJobFailed = {
  id: "01a06755-62f8-7bdc-8067-6948a85ec910",
  pageTypeSlug: "alert",
  slug: "backup-job-failed",
  title: "Backup job failed",
  definition: "a backup job finished without succeeding",
  domain: "infrastructure",
  summary: "Backup job {{ $labels.job_name }} failed in {{ $labels.namespace }}",
  description: "txt",
} as const satisfies Alert
