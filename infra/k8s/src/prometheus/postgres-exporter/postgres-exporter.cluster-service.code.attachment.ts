import {
  postgresExporterDeploymentYaml,
  postgresExporterQueriesConfigmapYaml,
  postgresExporterServiceYaml,
} from "../synth-exporters"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    {
      name: "postgres-exporter-queries-configmap",
      yaml: postgresExporterQueriesConfigmapYaml(),
    },
    { name: "postgres-exporter-deployment", yaml: postgresExporterDeploymentYaml() },
    { name: "postgres-exporter-service", yaml: postgresExporterServiceYaml() },
  ]
}
