import {
  bankAccrual,
  withLatches,
} from "akasha/alan/harness/idle-system/modules/idle-accrual/idle-accrual.module.code.ts"
import type { GameState } from "akasha/alan/harness/idle-system/modules/idle-state/idle-state.module.code.ts"
import {
  type ActionIntent,
  type ActionResult,
  applyIntent,
} from "akasha/alan/web/modules/idle-actions/idle-actions.module.code.ts"

export function commitIntent(state: GameState, intent: ActionIntent, now: number): ActionResult {
  const banked = withLatches(bankAccrual(state, now))
  const { state: applied, outcome } = applyIntent(banked, intent, now)
  return { state: withLatches(applied), outcome }
}
