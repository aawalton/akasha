import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPgbouncer = {
  id: "01a06579-855d-7034-ba1c-d7a37313082b",
  pageTypeSlug: "workflow-template",
  slug: "workflow-pgbouncer",
  title: "Workflow pgbouncer",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["pgbouncer"],
} as const satisfies WorkflowTemplate
