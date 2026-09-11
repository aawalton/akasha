import {
  COMPONENT_MAINTENANCE,
  MAINTENANCE_NAMESPACE,
  maintenanceCronJobYaml,
} from "akasha/infrastructure/seaweedfs/maintenance-manifests/seaweedfs-maintenance-manifests.module.code.ts"
import { namespaceYaml } from "akasha/infrastructure/seaweedfs/namespace/seaweedfs-namespace.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(MAINTENANCE_NAMESPACE, COMPONENT_MAINTENANCE) },
    { name: "maintenance", yaml: maintenanceCronJobYaml() },
  ]
}
