import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowGrafana = {
  id: "01a06579-855d-7030-89dd-1c41e7b69898",
  pageTypeSlug: "workflow-template",
  slug: "workflow-grafana",
  title: "Workflow grafana",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["grafana"],
} as const satisfies WorkflowTemplate
