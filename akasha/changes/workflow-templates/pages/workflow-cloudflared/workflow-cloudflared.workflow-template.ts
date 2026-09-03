import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowCloudflared = {
  id: "01a06579-855d-702a-bb74-903151e541fd",
  pageTypeSlug: "workflow-template",
  slug: "workflow-cloudflared",
  title: "Workflow cloudflared",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: ["cloudflared", "ddns-headscale"],
} as const satisfies WorkflowTemplate
