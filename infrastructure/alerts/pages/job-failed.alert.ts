import type { Alert } from "../alert.page-type.ts"

export const jobFailed = {
  id: "01a06755-62fa-72bc-bd95-dd17149f5f38",
  pageTypeSlug: "alert",
  slug: "job-failed",
  title: "Job failed",
  definition: "a job finished without succeeding",
  domain: "infrastructure",
  summary: "Job(s) owned by {{ $labels.namespace }}/{{ $labels.owner_name }} failed",
  description: "txt",
} as const satisfies Alert
