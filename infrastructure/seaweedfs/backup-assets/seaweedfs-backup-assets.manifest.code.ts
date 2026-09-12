import {
  backupPvcYaml,
  backupPvYaml,
  COMPONENT_BACKUP,
} from "akasha/infrastructure/seaweedfs/modules/backup-manifests/seaweedfs-backup-manifests.module.code.ts"
import {
  ASSETS_NAMESPACE,
  backupAssetsCronJobYaml,
} from "akasha/infrastructure/seaweedfs/modules/longtail-assets/seaweedfs-longtail-assets.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/seaweedfs/modules/namespace/seaweedfs-namespace.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(ASSETS_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(ASSETS_NAMESPACE, ASSETS_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(ASSETS_NAMESPACE, ASSETS_NAMESPACE) },
    { name: "backup-assets", yaml: backupAssetsCronJobYaml() },
  ]
}
