import type { Alert } from "../../alert.page-type.types.ts"

export const cronJobStale = {
  id: "01a06755-62f9-79e5-b72f-ae0c7a0bb7ef",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "cron-job-stale",
  title: "Cron job stale",
  definition: "a cron job has gone longer without completing than its schedule allows",
  domain: "infrastructure",
  summary:
    "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} has not succeeded within 2x its schedule",
  runbook: "txt",
} as const satisfies Alert
