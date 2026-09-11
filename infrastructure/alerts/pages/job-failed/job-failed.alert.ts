import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const jobFailed = {
  id: "01a06755-62fa-72bc-bd95-dd17149f5f38",
  type: "alert",
  slug: "job-failed",
  title: "Job failed",
  definition: "a job finished without succeeding",
  domain: "infrastructure",
  summary: "Job(s) owned by {{ $labels.namespace }}/{{ $labels.owner_name }} failed",
  runbook: "txt",
} as const satisfies Alert
