import type { Alert } from "../alert.page-type.ts"

export const podCrashLooping = {
  id: "01a06755-62fa-7d4b-a0f9-df8ffc17eaf2",
  pageTypeSlug: "alert",
  slug: "pod-crash-looping",
  title: "Pod crash looping",
  definition: "a pod is restarting over and over instead of staying up",
  domain: "infrastructure",
  summary: "Pod {{ $labels.namespace }}/{{ $labels.pod }} is crash looping",
  description: "txt",
} as const satisfies Alert
