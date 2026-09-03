import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowCiTools = {
  id: "01a06579-855d-7028-825a-c24e88ce4a0b",
  pageTypeSlug: "workflow-template",
  slug: "workflow-ci-tools",
  title: "Workflow ci tools",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["ci-storage-admin", "ci-storage-maintain"],
} as const satisfies WorkflowTemplate
