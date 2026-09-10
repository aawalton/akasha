import type { Alert } from "../../alert.page-type.types.ts"

export const nodeMemoryPressure = {
  id: "01a06755-62fa-7f4c-83be-c05377088293",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "node-memory-pressure",
  title: "Node memory pressure",
  definition: "a node has less memory left than it needs to keep scheduling work",
  domain: "infrastructure",
  summary: "Node {{ $labels.instance }} memory available < 10%",
  runbook: "txt",
} as const satisfies Alert
