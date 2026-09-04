import type { Alert } from "../alert.page-type.ts"

export const macbookInferenceProbeStale = {
  id: "01a06755-62fa-7222-9915-b6b5a1364ae3",
  pageTypeSlug: "alert",
  slug: "macbook-inference-probe-stale",
  title: "MacBook inference probe stale",
  definition:
    "the probe watching the macbook inference pool has stopped writing while its host is up",
  domain: "inference",
  summary: "Macbook inference liveness probe is stale — monitoring blind",
  description: "txt",
} as const satisfies Alert
