import { backupCnpgCronJobYaml } from "../synth-backup"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "backup-cnpg", yaml: backupCnpgCronJobYaml() }]
}
