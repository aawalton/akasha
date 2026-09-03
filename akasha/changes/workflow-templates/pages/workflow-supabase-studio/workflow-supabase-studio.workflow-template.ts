import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowSupabaseStudio = {
  id: "01a06579-855e-7009-8f6b-9948b1e11361",
  pageTypeSlug: "workflow-template",
  slug: "workflow-supabase-studio",
  title: "Workflow supabase studio",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["supabase-studio"],
} as const satisfies WorkflowTemplate
