import { ruleText } from "@tools/lib/instructions-rule"
import type { SeatPresence } from "../seat-proc-key/seat-proc-key.module.code.ts"
import {
  DECLARATION_RELATIVE_PATH,
  decideSpawnGuard,
} from "../spawn-guard/spawn-guard.module.code.ts"

export interface NameHolder {
  readonly id: string
  readonly presence: SeatPresence
}

export function refuseHeldName(holder: NameHolder | null): string | null {
  const guard = decideSpawnGuard({ holder: holder?.presence ?? "absent" })
  if (guard.kind !== "reject") return null
  return ruleText(guard.reason, "reason", {
    command: "seat start",
    where: DECLARATION_RELATIVE_PATH,
    call: "decideSpawnGuard",
  })
}
