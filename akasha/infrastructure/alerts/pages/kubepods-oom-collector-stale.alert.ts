import type { Alert } from "../alert.page-type.ts"

export const kubepodsOomCollectorStale = {
  id: "01a06755-62fa-704d-9db0-1eed16a3bda8",
  pageTypeSlug: "alert",
  slug: "kubepods-oom-collector-stale",
  title: "Kubepods OOM collector stale",
  definition:
    "the collector reading out-of-memory kills from the kubepods slice has stopped writing",
  domain: "infrastructure",
  summary:
    "Kubepods OOM collector on {{ $labels.instance }} has stopped refreshing — tripwire reading is frozen",
  description: "txt",
} as const satisfies Alert
