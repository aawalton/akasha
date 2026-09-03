import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowSeaweedfs = {
  id: "01a06579-855e-7006-a2d5-477376c18a11",
  pageTypeSlug: "workflow-template",
  slug: "workflow-seaweedfs",
  title: "Workflow seaweedfs",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: [
    "seaweedfs-master",
    "seaweedfs-volume",
    "seaweedfs-filer",
    "seaweedfs-s3-gateway",
    "seaweedfs-etcd-snapshot",
  ],
} as const satisfies WorkflowTemplate
