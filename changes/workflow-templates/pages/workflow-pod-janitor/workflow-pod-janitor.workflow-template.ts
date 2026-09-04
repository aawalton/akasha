import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPodJanitor = {
  id: "01a06579-855d-7035-a889-6ebf6a0ebd85",
  pageTypeSlug: "workflow-template",
  slug: "workflow-pod-janitor",
  title: "Workflow pod janitor",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["pod-janitor"],
} as const satisfies WorkflowTemplate
