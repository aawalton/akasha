import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowGitTransport = {
  id: "01a06579-855d-702e-b235-e115aa1f1849",
  pageTypeSlug: "workflow-template",
  slug: "workflow-git-transport",
  title: "Workflow git transport",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["git-transport"],
} as const satisfies WorkflowTemplate
