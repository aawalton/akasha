import { backupAssetsCronJobYaml } from "../synth-longtail-assets"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "backup-assets", yaml: backupAssetsCronJobYaml() }]
}
