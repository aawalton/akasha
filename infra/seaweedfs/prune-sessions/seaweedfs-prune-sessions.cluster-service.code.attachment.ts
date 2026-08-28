import { pruneSessionsCronJobYaml } from "../synth-prune"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "prune-sessions", yaml: pruneSessionsCronJobYaml() }]
}
