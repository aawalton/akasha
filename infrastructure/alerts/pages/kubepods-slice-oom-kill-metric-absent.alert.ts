import type { Alert } from "../alert.page-type.ts"

export const kubepodsSliceOomKillMetricAbsent = {
  id: "01a06755-62fa-72b8-b8f2-d882da3e6c54",
  pageTypeSlug: "alert",
  slug: "kubepods-slice-oom-kill-metric-absent",
  title: "Kubepods slice OOM kill metric absent",
  definition: "nothing is reporting out-of-memory kills in the kubepods cgroup slice",
  domain: "infrastructure",
  summary: "Kubepods slice-OOM tripwire series is absent — the tripwire is blind",
  description: "txt",
} as const satisfies Alert
