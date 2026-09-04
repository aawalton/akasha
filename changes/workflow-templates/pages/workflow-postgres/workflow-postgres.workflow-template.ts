import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPostgres = {
  id: "01a06579-855e-7000-91a6-4b3b92f011e3",
  pageTypeSlug: "workflow-template",
  slug: "workflow-postgres",
  title: "Workflow postgres",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: [
    "postgres-cnpg",
    "postgres-annual-dump",
    "gfs-promoter",
    "seaweedfs-backup-longtail",
  ],
} as const satisfies WorkflowTemplate
