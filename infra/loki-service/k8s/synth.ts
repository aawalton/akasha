import { configmapYaml, deploymentYaml, namespaceYaml, serviceYaml } from "../synth-loki"
import { promtailConfigmapYaml, promtailDaemonsetYaml, promtailRbacYaml } from "../synth-promtail"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml() },
    { name: "configmap", yaml: configmapYaml() },
    { name: "deployment", yaml: deploymentYaml() },
    { name: "service", yaml: serviceYaml() },
    { name: "promtail-configmap", yaml: promtailConfigmapYaml() },
    { name: "promtail-rbac", yaml: promtailRbacYaml() },
    { name: "promtail-daemonset", yaml: promtailDaemonsetYaml() },
  ]
}
