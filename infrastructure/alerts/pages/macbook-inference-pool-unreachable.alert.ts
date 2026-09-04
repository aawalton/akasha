import type { Alert } from "../alert.page-type.ts"

export const macbookInferencePoolUnreachable = {
  id: "01a06755-62fa-7e03-b91a-373657781e93",
  pageTypeSlug: "alert",
  slug: "macbook-inference-pool-unreachable",
  title: "MacBook inference pool unreachable",
  definition: "the macbook inference pool is not answering",
  domain: "inference",
  summary: "Macbook inference pool not serving ({{ $labels.probe_result }})",
  description: "txt",
} as const satisfies Alert
