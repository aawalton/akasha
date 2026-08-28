import {
  promtailConfigmapYaml,
  promtailDaemonsetYaml,
  promtailRbacYaml,
} from "../synth-promtail"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "promtail-configmap", yaml: promtailConfigmapYaml() },
    { name: "promtail-rbac", yaml: promtailRbacYaml() },
    { name: "promtail-daemonset", yaml: promtailDaemonsetYaml() },
  ]
}
