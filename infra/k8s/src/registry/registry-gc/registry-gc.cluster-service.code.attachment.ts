import { cronjobGcYaml } from "../synth-gc"

export default function synth(): readonly { readonly name: string; readonly yaml: string }[] {
  return [{ name: "cronjob-gc", yaml: cronjobGcYaml() }]
}
