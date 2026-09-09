import {
  kubeStateMetricsDeploymentYaml,
  kubeStateMetricsRbacYaml,
  kubeStateMetricsServiceYaml,
} from "./modules/manifests/kube-state-metrics-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "kube-state-metrics-rbac", yaml: kubeStateMetricsRbacYaml() },
    { name: "kube-state-metrics-deployment", yaml: kubeStateMetricsDeploymentYaml() },
    { name: "kube-state-metrics-service", yaml: kubeStateMetricsServiceYaml() },
  ]
}
