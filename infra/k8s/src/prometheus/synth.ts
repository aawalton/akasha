import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { NAMESPACE, NAMESPACE_LABELS } from "./synth-constants"
import {
  postgresExporterDeploymentYaml,
  postgresExporterQueriesConfigmapYaml,
  postgresExporterServiceYaml,
} from "./synth-exporters"
import { dcgmExporterDaemonsetYaml, nodeExporterDaemonsetYaml } from "./synth-exporters-daemonsets"
import {
  kubeStateMetricsDeploymentYaml,
  kubeStateMetricsRbacYaml,
  kubeStateMetricsServiceYaml,
} from "./synth-kube-state-metrics"
import {
  pgbouncerExporterDeploymentYaml,
  pgbouncerExporterServiceYaml,
} from "./synth-pgbouncer-exporter"
import {
  prometheusConfigmapYaml,
  prometheusDeploymentYaml,
  prometheusPvcYaml,
  prometheusPvYaml,
  prometheusRbacYaml,
  prometheusServiceYaml,
} from "./synth-prometheus"

function namespaceYaml(): string {
  return synthOne(NAMESPACE, "namespace", {
    apiVersion: "v1",
    kind: "Namespace",
    metadata: {
      name: NAMESPACE,
      labels: NAMESPACE_LABELS,
    },
  })
}

export default async function synth(): Promise<
  readonly { readonly name: string; readonly yaml: string }[]
> {
  const prometheusConfigmap = await prometheusConfigmapYaml()
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "prometheus-rbac", yaml: prometheusRbacYaml() },
    { name: "prometheus-pv", yaml: prometheusPvYaml() },
    { name: "prometheus-pvc", yaml: prometheusPvcYaml() },
    { name: "prometheus-configmap", yaml: prometheusConfigmap },
    { name: "prometheus-deployment", yaml: prometheusDeploymentYaml() },
    { name: "prometheus-service", yaml: prometheusServiceYaml() },
    { name: "node-exporter-daemonset", yaml: nodeExporterDaemonsetYaml() },
    { name: "dcgm-exporter-daemonset", yaml: dcgmExporterDaemonsetYaml() },
    {
      name: "postgres-exporter-queries-configmap",
      yaml: postgresExporterQueriesConfigmapYaml(),
    },
    { name: "postgres-exporter-deployment", yaml: postgresExporterDeploymentYaml() },
    { name: "postgres-exporter-service", yaml: postgresExporterServiceYaml() },
    { name: "pgbouncer-exporter-deployment", yaml: pgbouncerExporterDeploymentYaml() },
    { name: "pgbouncer-exporter-service", yaml: pgbouncerExporterServiceYaml() },
    { name: "kube-state-metrics-rbac", yaml: kubeStateMetricsRbacYaml() },
    { name: "kube-state-metrics-deployment", yaml: kubeStateMetricsDeploymentYaml() },
    { name: "kube-state-metrics-service", yaml: kubeStateMetricsServiceYaml() },
  ]
}
