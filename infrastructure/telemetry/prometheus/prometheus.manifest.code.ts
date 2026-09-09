import { namespaceYaml } from "@akasha/k8s-types/k8s-namespace"
import {
  NAMESPACE,
  NAMESPACE_LABELS,
} from "../prometheus-constants/prometheus-constants.module.code.ts"
import {
  prometheusConfigmapYaml,
  prometheusDeploymentYaml,
  prometheusPvcYaml,
  prometheusPvYaml,
  prometheusRbacYaml,
  prometheusServiceYaml,
} from "./modules/manifests/prometheus-manifests.module.code.ts"

export default async function synth(): Promise<
  readonly { readonly name: string; readonly yaml: string }[]
> {
  const prometheusConfigmap = await prometheusConfigmapYaml()
  return [
    { name: "namespace", yaml: namespaceYaml(NAMESPACE, NAMESPACE_LABELS) },
    { name: "prometheus-rbac", yaml: prometheusRbacYaml() },
    { name: "prometheus-pv", yaml: prometheusPvYaml() },
    { name: "prometheus-pvc", yaml: prometheusPvcYaml() },
    { name: "prometheus-configmap", yaml: prometheusConfigmap },
    { name: "prometheus-deployment", yaml: prometheusDeploymentYaml() },
    { name: "prometheus-service", yaml: prometheusServiceYaml() },
  ]
}
