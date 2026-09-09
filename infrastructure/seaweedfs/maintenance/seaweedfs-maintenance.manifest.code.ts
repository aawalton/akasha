import {
  COMPONENT_MAINTENANCE,
  MAINTENANCE_NAMESPACE,
  maintenanceCronJobYaml,
} from "../maintenance-manifests/seaweedfs-maintenance-manifests.module.code.ts"
import { namespaceYaml } from "../namespace/seaweedfs-namespace.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(MAINTENANCE_NAMESPACE, COMPONENT_MAINTENANCE) },
    { name: "maintenance", yaml: maintenanceCronJobYaml() },
  ]
}
