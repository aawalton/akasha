import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowGotrue = {
  id: "01a06579-855d-702f-b30a-80080ac69334",
  pageTypeSlug: "workflow-template",
  slug: "workflow-gotrue",
  title: "Workflow gotrue",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["gotrue"],
} as const satisfies WorkflowTemplate
