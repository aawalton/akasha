import {
  pgbouncerExporterDeploymentYaml,
  pgbouncerExporterServiceYaml,
} from "@akasha/cluster-manifests/pgbouncer-exporter-manifests"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "pgbouncer-exporter-deployment", yaml: pgbouncerExporterDeploymentYaml() },
    { name: "pgbouncer-exporter-service", yaml: pgbouncerExporterServiceYaml() },
  ]
}
