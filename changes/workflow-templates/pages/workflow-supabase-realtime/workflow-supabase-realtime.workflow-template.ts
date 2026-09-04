import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowSupabaseRealtime = {
  id: "01a06579-855e-7008-9538-894b6e27e9bb",
  pageTypeSlug: "workflow-template",
  slug: "workflow-supabase-realtime",
  title: "Workflow supabase realtime",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["supabase-realtime"],
} as const satisfies WorkflowTemplate
