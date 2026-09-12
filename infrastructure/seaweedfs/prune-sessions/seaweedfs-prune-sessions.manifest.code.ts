import { namespaceYaml } from "akasha/infrastructure/seaweedfs/modules/namespace/seaweedfs-namespace.module.code.ts"
import {
  COMPONENT_PRUNE,
  PRUNE_NAMESPACE,
  pruneSessionsCronJobYaml,
} from "akasha/infrastructure/seaweedfs/modules/prune-manifests/seaweedfs-prune-manifests.module.code.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(PRUNE_NAMESPACE, COMPONENT_PRUNE) },
    { name: "prune-sessions", yaml: pruneSessionsCronJobYaml() },
  ]
}
