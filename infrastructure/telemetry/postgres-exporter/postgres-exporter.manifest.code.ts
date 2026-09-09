import {
  postgresExporterDeploymentYaml,
  postgresExporterQueriesConfigmapYaml,
  postgresExporterServiceYaml,
} from "./modules/manifests/postgres-exporter-manifests.module.code.ts"

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
