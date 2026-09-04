import {
  BULK_NAMESPACE,
  backupBulkCronJobYaml,
  backupPvcYaml,
  backupPvYaml,
  COMPONENT_BACKUP,
} from "../seaweedfs-backup-manifests/seaweedfs-backup-manifests.module.code.ts"
import { namespaceYaml } from "../seaweedfs-namespace/seaweedfs-namespace.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(BULK_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(BULK_NAMESPACE, BULK_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(BULK_NAMESPACE, BULK_NAMESPACE) },
    { name: "backup-bulk", yaml: backupBulkCronJobYaml() },
  ]
}
