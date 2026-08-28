import { backupBulkCronJobYaml } from "../synth-backup"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "backup-bulk", yaml: backupBulkCronJobYaml() }]
}
