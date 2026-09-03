import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowCheck = {
  id: "01a06579-855d-7026-8904-834a5ac7049b",
  pageTypeSlug: "workflow-template",
  slug: "workflow-check",
  title: "Workflow check",
  workflowKind: "checks",
  declaration: "ts",
} as const satisfies WorkflowTemplate
