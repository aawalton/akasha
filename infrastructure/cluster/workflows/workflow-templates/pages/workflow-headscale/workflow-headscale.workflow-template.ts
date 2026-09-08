import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowHeadscale = {
  id: "01a06579-855d-7031-97c1-af842b8b8ad7",
  pageTypeSlug: "workflow-template",
  slug: "workflow-headscale",
  title: "Workflow headscale",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["headscale", "talos-subnet-router"],
} as const satisfies WorkflowTemplate
