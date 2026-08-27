import { alertWords, withAnnotations } from "./alert-annotations"
import { ALERT_RULES } from "./synth-alerts"

export async function alertsYml(): Promise<string> {
  return withAnnotations(ALERT_RULES, await alertWords())
}
