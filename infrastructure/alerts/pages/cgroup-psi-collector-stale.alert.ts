import type { Alert } from "../alert.page-type.ts"

export const cgroupPsiCollectorStale = {
  id: "01a06755-62f9-7451-a703-53f3e5989f26",
  pageTypeSlug: "alert",
  slug: "cgroup-psi-collector-stale",
  title: "Cgroup PSI collector stale",
  definition: "the collector reading how long work waits on cgroup resources has stopped writing",
  domain: "infrastructure",
  summary: "cgroup-psi collector on {{ $labels.instance }} has not published for over 300s",
  description: "txt",
} as const satisfies Alert
