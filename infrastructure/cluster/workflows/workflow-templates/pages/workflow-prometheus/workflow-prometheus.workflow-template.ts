import type { WorkflowTemplate } from "../../workflow-template.page-type.ts"

export const workflowPrometheus = {
  id: "01a06579-855e-7004-bfea-7f62e4364e7a",
  pageTypeSlug: "workflow-template",
  slug: "workflow-prometheus",
  title: "Workflow prometheus",
  workflowKind: "foundation",
  declaration: "ts",
  clusterServiceSlugs: [
    "prometheus",
    "postgres-exporter",
    "pgbouncer-exporter",
    "kube-state-metrics",
    "node-exporter-daemonset",
    "dcgm-exporter-daemonset",
  ],
} as const satisfies WorkflowTemplate
