import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowRegistry = {
  id: "01a06579-855e-7005-9ae8-fce8c444957a",
  pageTypeSlug: "workflow-template",
  slug: "workflow-registry",
  title: "Workflow registry",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["registry", "registry-gc"],
} as const satisfies WorkflowTemplate
