import { cronjobGcYaml } from "@akasha/cluster-manifests/registry-gc-manifests"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "cronjob-gc", yaml: cronjobGcYaml() }]
}
