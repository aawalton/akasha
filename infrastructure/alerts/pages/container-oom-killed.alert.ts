import type { Alert } from "../alert.page-type.ts"

export const containerOomKilled = {
  id: "01a06755-62f9-7fe2-97ef-3a5b58a994c5",
  pageTypeSlug: "alert",
  slug: "container-oom-killed",
  title: "Container OOM killed",
  definition: "a container was killed for running out of memory",
  domain: "infrastructure",
  summary:
    "Container {{ $labels.namespace }}/{{ $labels.pod }}/{{ $labels.container }} is OOM-killed and restarting",
  description: "txt",
} as const satisfies Alert
