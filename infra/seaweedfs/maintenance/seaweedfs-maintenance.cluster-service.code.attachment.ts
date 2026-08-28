import {
  COMPONENT_MAINTENANCE,
  MAINTENANCE_NAMESPACE,
  maintenanceCronJobYaml,
} from "../synth-maintenance.ts"
import { namespaceYaml } from "../synth-namespace.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(MAINTENANCE_NAMESPACE, COMPONENT_MAINTENANCE) },
    { name: "maintenance", yaml: maintenanceCronJobYaml() },
  ]
}
