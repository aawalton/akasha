import type { Alert } from "../../alert.page-type.ts"

export const nodeDiskPressure = {
  id: "01a06755-62fa-77f4-b722-505724308e48",
  pageTypeSlug: "alert",
  type: "alert",
  slug: "node-disk-pressure",
  title: "Node disk pressure",
  definition: "a node has less disk left than it needs to keep scheduling work",
  domain: "infrastructure",
  summary: "Node {{ $labels.instance }} disk available < 15%",
  runbook: "txt",
} as const satisfies Alert
