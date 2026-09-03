import type { Alert } from "../alert.page-type.ts"

export const nodeNotReady = {
  id: "01a06755-62fa-7984-a4b9-20c29a73e619",
  pageTypeSlug: "alert",
  slug: "node-not-ready",
  title: "Node not ready",
  definition: "a node has stopped reporting itself ready to run work",
  domain: "infrastructure",
  summary: "Node {{ $labels.node }} is NotReady",
  description: "txt",
} as const satisfies Alert
