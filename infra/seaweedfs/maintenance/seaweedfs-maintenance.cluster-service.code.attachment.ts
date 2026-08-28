import { maintenanceCronJobYaml } from "../synth-maintenance"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "maintenance", yaml: maintenanceCronJobYaml() }]
}
