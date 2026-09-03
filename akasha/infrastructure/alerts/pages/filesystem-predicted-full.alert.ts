import type { Alert } from "../alert.page-type.ts"

export const filesystemPredictedFull = {
  id: "01a06755-62f9-71ce-a1f7-7afd52da1193",
  pageTypeSlug: "alert",
  slug: "filesystem-predicted-full",
  title: "Filesystem predicted full",
  definition: "a filesystem is filling fast enough to run out of room soon",
  domain: "infrastructure",
  summary:
    "Filesystem {{ $labels.mountpoint }} on {{ $labels.instance }} predicted to fill within 7 days",
  description: "txt",
} as const satisfies Alert
