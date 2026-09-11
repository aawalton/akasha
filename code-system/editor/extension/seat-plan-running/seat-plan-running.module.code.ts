import { output } from "akasha/code-system/editor/extension/agent-tree-state/agent-tree-state.module.code.ts"
import { invokedSeat } from "akasha/code-system/editor/extension/invoked-seat/invoked-seat.module.code.ts"
import {
  confirmTurnLoss,
  type SeatAct,
} from "akasha/code-system/editor/extension/seat-act-confirm/seat-act-confirm.module.code.ts"
import { performPlan } from "akasha/code-system/editor/extension/seat-acts/seat-acts.module.code.ts"
import type {
  SeatStep,
  SeatToggleState,
} from "akasha/code-system/editor/extension/seat-toggles/seat-toggles.module.code.ts"
import * as vscode from "vscode"

export async function runPlan(
  node: unknown,
  plan: (state: SeatToggleState) => readonly SeatStep[],
  act: SeatAct,
  refresh: (trigger: string) => Promise<undefined>
): Promise<undefined> {
  const seat = invokedSeat(node)
  if (seat === undefined) {
    return undefined
  }
  const state: SeatToggleState = { running: seat.live, place: seat.place }
  const steps = plan(state)
  const prompt = confirmTurnLoss(act, seat.name, state, steps)
  if (prompt !== undefined) {
    const picked = await vscode.window.showWarningMessage(
      prompt.message,
      { modal: true, detail: prompt.detail },
      prompt.confirm
    )
    if (picked !== prompt.confirm) {
      output.appendLine(`[${act}] ${seat.name}: declined at the warning, nothing done`)
      return undefined
    }
  }
  await performPlan(seat, steps, act)
  await refresh(act)
  return undefined
}
