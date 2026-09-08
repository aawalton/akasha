import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowTailnetEgress = {
  id: "01a06579-855e-700a-b171-23b3224f34d7",
  pageTypeSlug: "workflow-template",
  slug: "workflow-tailnet-egress",
  title: "Workflow tailnet egress",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["tailnet-egress"],
} as const satisfies WorkflowTemplate
