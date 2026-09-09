import {
  pgbouncerExporterDeploymentYaml,
  pgbouncerExporterServiceYaml,
} from "./modules/manifests/pgbouncer-exporter-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "pgbouncer-exporter-deployment", yaml: pgbouncerExporterDeploymentYaml() },
    { name: "pgbouncer-exporter-service", yaml: pgbouncerExporterServiceYaml() },
  ]
}
