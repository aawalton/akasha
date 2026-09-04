import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPostgrest = {
  id: "01a06579-855e-7001-9486-da69e9ed3b9f",
  pageTypeSlug: "workflow-template",
  slug: "workflow-postgrest",
  title: "Workflow postgrest",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["postgrest"],
} as const satisfies WorkflowTemplate
