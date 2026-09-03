import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPrimitives = {
  id: "01a06579-855e-7003-a413-ab8e44d49beb",
  pageTypeSlug: "workflow-template",
  slug: "workflow-primitives",
  title: "Workflow primitives",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["nvidia-device-plugin"],
} as const satisfies WorkflowTemplate
