import { namespaceYaml } from "../synth-namespace.ts"
import { COMPONENT_PRUNE, PRUNE_NAMESPACE, pruneSessionsCronJobYaml } from "../synth-prune.ts"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [
    { name: "namespace", yaml: namespaceYaml(PRUNE_NAMESPACE, COMPONENT_PRUNE) },
    { name: "prune-sessions", yaml: pruneSessionsCronJobYaml() },
  ]
}
