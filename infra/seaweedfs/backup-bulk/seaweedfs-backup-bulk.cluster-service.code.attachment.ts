import { BULK_NAMESPACE, backupPvcYaml, backupPvYaml, COMPONENT_BACKUP, backupBulkCronJobYaml } from "../synth-backup.ts"
import { namespaceYaml } from "../synth-namespace.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(BULK_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(BULK_NAMESPACE, BULK_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(BULK_NAMESPACE, BULK_NAMESPACE) },
    { name: "backup-bulk", yaml: backupBulkCronJobYaml() },
  ]
}
