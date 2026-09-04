import type { Alert } from "../alert.page-type.ts"

export const kubepodsSliceOomKill = {
  id: "01a06755-62fa-7f26-8363-42cd346a47be",
  pageTypeSlug: "alert",
  slug: "kubepods-slice-oom-kill",
  title: "Kubepods slice OOM kill",
  definition: "the kubepods cgroup slice ran out of memory and killed something inside it",
  domain: "infrastructure",
  summary:
    "Kubepods parent slice on {{ $labels.instance }} killed a container that was within its own memory limit",
  description: "txt",
} as const satisfies Alert
