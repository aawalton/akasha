import type { Alert } from "../alert.page-type.ts"

export const podPending = {
  id: "01a06755-62fa-7081-8013-cdfa3b7c5c5b",
  pageTypeSlug: "alert",
  slug: "pod-pending",
  title: "Pod pending",
  definition: "a pod has stayed unscheduled instead of being placed on a node",
  domain: "infrastructure",
  summary: "Pod {{ $labels.namespace }}/{{ $labels.pod }} stuck Pending > 15m",
  description: "txt",
} as const satisfies Alert
