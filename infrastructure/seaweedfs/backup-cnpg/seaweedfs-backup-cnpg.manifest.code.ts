import {
  backupCnpgCronJobYaml,
  backupPvcYaml,
  backupPvYaml,
  CNPG_NAMESPACE,
  COMPONENT_BACKUP,
} from "../seaweedfs-backup-manifests/seaweedfs-backup-manifests.module.code.ts"
import { namespaceYaml } from "../seaweedfs-namespace/seaweedfs-namespace.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(CNPG_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(CNPG_NAMESPACE, CNPG_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(CNPG_NAMESPACE, CNPG_NAMESPACE) },
    { name: "backup-cnpg", yaml: backupCnpgCronJobYaml() },
  ]
}
