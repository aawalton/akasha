import type { SeatPresence } from "akasha/agent/seat/observation/modules/seat-proc-key/seat-proc-key.module.code.ts"
import {
  DECLARING_MODULE,
  decideSpawnGuard,
} from "akasha/agent/seat/start-guard/modules/spawn-guard/spawn-guard.module.code.ts"
import { ruleText } from "akasha/alan/harness/rules-engine/modules/instructions-rule/instructions-rule.module.code.ts"

export interface NameHolder {
  readonly id: string
  readonly presence: SeatPresence
}

export function refuseHeldName(holder: NameHolder | null): string | null {
  const guard = decideSpawnGuard({ holder: holder?.presence ?? "absent" })
  if (guard.kind !== "reject") return null
  return ruleText(guard.reason, "reason", {
    command: "seat start",
    where: DECLARING_MODULE,
    call: "decideSpawnGuard",
  })
}
