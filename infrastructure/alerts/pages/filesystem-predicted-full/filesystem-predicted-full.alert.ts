import type { Alert } from "akasha/infrastructure/alerts/alert.page-type.types.ts"

export const filesystemPredictedFull = {
  id: "01a06755-62f9-71ce-a1f7-7afd52da1193",
  type: "alert",
  slug: "filesystem-predicted-full",
  title: "Filesystem predicted full",
  definition: "a filesystem is filling fast enough to run out of room soon",
  domain: "infrastructure",
  summary:
    "Filesystem {{ $labels.mountpoint }} on {{ $labels.instance }} predicted to fill within 7 days",
  runbook: "txt",
} as const satisfies Alert
