import {
  pgbouncerExporterDeploymentYaml,
  pgbouncerExporterServiceYaml,
} from "../synth-pgbouncer-exporter"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "pgbouncer-exporter-deployment", yaml: pgbouncerExporterDeploymentYaml() },
    { name: "pgbouncer-exporter-service", yaml: pgbouncerExporterServiceYaml() },
  ]
}
