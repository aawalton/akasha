import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowLoki = {
  id: "01a06579-855d-7032-a734-93051d64cde6",
  pageTypeSlug: "workflow-template",
  slug: "workflow-loki",
  title: "Workflow loki",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["loki", "promtail"],
} as const satisfies WorkflowTemplate
