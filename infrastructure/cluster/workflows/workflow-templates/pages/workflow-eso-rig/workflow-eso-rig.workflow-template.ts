import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowEsoRig = {
  id: "01a06579-855d-702d-8d7c-ed6d21415e22",
  pageTypeSlug: "workflow-template",
  slug: "workflow-eso-rig",
  title: "Workflow eso rig",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["eso-rig"],
} as const satisfies WorkflowTemplate
