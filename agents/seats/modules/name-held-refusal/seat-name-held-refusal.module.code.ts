import type { SeatPresence } from "akasha/agents/seats/modules/proc-key/seat-proc-key.module.code.ts"
import { ruleText } from "akasha/alan/harness/rules-engine/instructions-rule/instructions-rule.module.code.ts"
import {
  DECLARING_MODULE,
  decideSpawnGuard,
} from "akasha/seat-system/spawn-guard/spawn-guard.module.code.ts"

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
