import { nodeExporterDaemonsetYaml } from "@akasha/cluster-manifests/exporter-daemonsets"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "node-exporter-daemonset", yaml: nodeExporterDaemonsetYaml() }]
}
