import { sectionStopTargets } from "akasha/code/editor/extension/modules/agent-forest/agent-forest.module.code.ts"
import {
  forest,
  output,
} from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import {
  invokedSeat,
  type ToggleTarget,
} from "akasha/code/editor/extension/modules/invoked-seat/invoked-seat.module.code.ts"
import {
  confirmSectionStop,
  confirmTurnLoss,
  type SeatAct,
} from "akasha/code/editor/extension/modules/seat-act-confirm/seat-act-confirm.module.code.ts"
import { performPlan } from "akasha/code/editor/extension/modules/seat-acts/seat-acts.module.code.ts"
import {
  planRunToggle,
  type SeatStep,
  type SeatToggleState,
} from "akasha/code/editor/extension/modules/seat-toggles/seat-toggles.module.code.ts"
import * as vscode from "vscode"
import { z } from "zod"

const RUN_STOP: SeatAct = "run-stop"

const SECTION_CLICK_SCHEMA = z.looseObject({
  key: z.string().min(1),
  label: z.string(),
  kind: z.literal("root"),
})

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

export function runStop(
  node: unknown,
  refresh: (trigger: string) => Promise<undefined>
): Promise<undefined> {
  const clicked = SECTION_CLICK_SCHEMA.safeParse(node)
  return clicked.success
    ? runSectionStop(clicked.data.key, clicked.data.label, refresh)
    : runPlan(node, planRunToggle, RUN_STOP, refresh)
}

async function runSectionStop(
  key: string,
  section: string,
  refresh: (trigger: string) => Promise<undefined>
): Promise<undefined> {
  const seats = sectionStopTargets(forest, key).flatMap((row): ToggleTarget[] => {
    const seat = invokedSeat(row)
    return seat === undefined ? [] : [seat]
  })
  if (seats.length === 0) {
    output.appendLine(`[${RUN_STOP}] ${section}: no seat running in this section, nothing done`)
    return undefined
  }
  const prompt = confirmSectionStop(section, seats.length)
  const picked = await vscode.window.showWarningMessage(
    prompt.message,
    { modal: true, detail: prompt.detail },
    prompt.confirm
  )
  if (picked !== prompt.confirm) {
    output.appendLine(`[${RUN_STOP}] ${section}: declined at the warning, nothing done`)
    return undefined
  }
  for (const seat of seats) {
    await performPlan(seat, planRunToggle({ running: seat.live, place: seat.place }), RUN_STOP)
  }
  await refresh(RUN_STOP)
  return undefined
}
