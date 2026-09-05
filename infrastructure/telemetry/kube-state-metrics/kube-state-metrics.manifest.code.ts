import {
  kubeStateMetricsDeploymentYaml,
  kubeStateMetricsRbacYaml,
  kubeStateMetricsServiceYaml,
} from "@akasha/cluster-manifests/kube-state-metrics-manifests"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "kube-state-metrics-rbac", yaml: kubeStateMetricsRbacYaml() },
    { name: "kube-state-metrics-deployment", yaml: kubeStateMetricsDeploymentYaml() },
    { name: "kube-state-metrics-service", yaml: kubeStateMetricsServiceYaml() },
  ]
}
