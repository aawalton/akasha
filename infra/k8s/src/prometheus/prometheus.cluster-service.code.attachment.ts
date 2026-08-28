import { synthOne } from "@infra/k8s-types/cdk8s-synth"
import { NAMESPACE, NAMESPACE_LABELS } from "./synth-constants"
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
  ]
}
