import { bankAccrual, withLatches } from "@akasha/idle-system/accrual"
import { type GameState } from "@akasha/idle-system/state"
import { type ActionIntent, type ActionResult, applyIntent } from "~/idle/lib/idle-actions"

export function commitIntent(state: GameState, intent: ActionIntent, now: number): ActionResult {
  const banked = withLatches(bankAccrual(state, now))
  const { state: applied, outcome } = applyIntent(banked, intent, now)
  return { state: withLatches(applied), outcome }
}
