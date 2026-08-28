import { nodeExporterDaemonsetYaml } from "../synth-exporters-daemonsets"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "node-exporter-daemonset", yaml: nodeExporterDaemonsetYaml() }]
}
