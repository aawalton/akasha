import { dcgmExporterDaemonsetYaml } from "../synth-exporters-daemonsets"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "dcgm-exporter-daemonset", yaml: dcgmExporterDaemonsetYaml() }]
}
