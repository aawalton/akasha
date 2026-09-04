import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowAuthProxy = {
  id: "01a06579-855d-7023-8d64-8597ea32793d",
  pageTypeSlug: "workflow-template",
  slug: "workflow-auth-proxy",
  title: "Workflow auth proxy",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["auth-proxy"],
} as const satisfies WorkflowTemplate
