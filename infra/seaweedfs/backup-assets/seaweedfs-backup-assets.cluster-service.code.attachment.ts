import { COMPONENT_BACKUP, backupPvcYaml, backupPvYaml } from "../synth-backup.ts"
import { ASSETS_NAMESPACE, backupAssetsCronJobYaml } from "../synth-longtail-assets.ts"
import { namespaceYaml } from "../synth-namespace.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(ASSETS_NAMESPACE, COMPONENT_BACKUP) },
    { name: "backup-pv", yaml: backupPvYaml(ASSETS_NAMESPACE, ASSETS_NAMESPACE) },
    { name: "backup-pvc", yaml: backupPvcYaml(ASSETS_NAMESPACE, ASSETS_NAMESPACE) },
    { name: "backup-assets", yaml: backupAssetsCronJobYaml() },
  ]
}
