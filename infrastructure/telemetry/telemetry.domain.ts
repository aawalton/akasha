import type { Domain } from "../../domains/domain.page-type.ts"

export const telemetry = {
  id: "01a0658b-0f02-79eb-aed4-e7e8b92bc117",
  pageTypeSlug: "domain",
  slug: "telemetry",
  definition: "somewhere a program records what it is doing",
  parts: [
    "domain/log",
    "domain/metric",
    "manifest/dcgm-exporter-daemonset",
    "manifest/grafana",
    "manifest/kube-state-metrics",
    "manifest/node-exporter-daemonset",
    "manifest/pgbouncer-exporter",
    "manifest/postgres-exporter",
    "manifest/prometheus",
    "module/prometheus-constants",
    "page-type/dashboard",
    "workstation-service/dcgm-exporter",
    "workstation-service/node-exporter",
  ],
} as const satisfies Domain
