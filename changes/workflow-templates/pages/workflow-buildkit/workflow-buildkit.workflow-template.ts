import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowBuildkit = {
  id: "01a06579-855d-7024-96ca-17adff0dc0ec",
  pageTypeSlug: "workflow-template",
  slug: "workflow-buildkit",
  title: "Workflow buildkit",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["buildkit", "buildkit-prune"],
} as const satisfies WorkflowTemplate
