import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowVoiceInfer = {
  id: "01a06579-855e-700d-85d5-2e90edf966b4",
  pageTypeSlug: "workflow-template",
  slug: "workflow-voice-infer",
  title: "Workflow voice infer",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["voice-infer"],
} as const satisfies WorkflowTemplate
