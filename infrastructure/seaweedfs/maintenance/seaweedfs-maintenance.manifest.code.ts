import { namespaceYaml } from "../namespace/seaweedfs-namespace.module.code.ts"
import {
  COMPONENT_MAINTENANCE,
  MAINTENANCE_NAMESPACE,
  maintenanceCronJobYaml,
} from "../seaweedfs-maintenance-manifests/seaweedfs-maintenance-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(MAINTENANCE_NAMESPACE, COMPONENT_MAINTENANCE) },
    { name: "maintenance", yaml: maintenanceCronJobYaml() },
  ]
}
