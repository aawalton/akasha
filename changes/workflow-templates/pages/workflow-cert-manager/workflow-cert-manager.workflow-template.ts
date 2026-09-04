import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowCertManager = {
  id: "01a06579-855d-7025-8afc-6fcd4f246ce8",
  pageTypeSlug: "workflow-template",
  slug: "workflow-cert-manager",
  title: "Workflow cert manager",
  workflowKind: "foundation",
  declaration: "ts",
} as const satisfies WorkflowTemplate
