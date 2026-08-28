import { CNPG_NAMESPACE, backupPvcYaml, backupPvYaml, COMPONENT_BACKUP, backupCnpgCronJobYaml } from "../synth-backup.ts"
import { namespaceYaml } from "../synth-namespace.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(CNPG_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(CNPG_NAMESPACE, CNPG_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(CNPG_NAMESPACE, CNPG_NAMESPACE) },
    { name: "backup-cnpg", yaml: backupCnpgCronJobYaml() },
  ]
}
