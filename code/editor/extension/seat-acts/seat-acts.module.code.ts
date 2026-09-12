import { seatTerminalOptions } from "akasha/code/editor/extension/editor-group/editor-group.module.code.ts"
import {
  callHarness,
  LANDING_TIMEOUT_MS,
} from "akasha/code/editor/extension/harness-call/harness-call.module.code.ts"
import type { ToggleTarget } from "akasha/code/editor/extension/invoked-seat/invoked-seat.module.code.ts"
import { output } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import {
  interactiveCall,
  NOTICES_CALL,
  resetCall,
  revivingCall,
  type SeatCall,
  stopCall,
} from "akasha/code/editor/extension/seat-calls/seat-calls.module.code.ts"
import { columnForSeat } from "akasha/code/editor/extension/seat-showing/seat-showing.module.code.ts"
import { readSeatLookup } from "akasha/code/editor/extension/seat-terminals/seat-terminals.module.code.ts"
import {
  attachCommandLine,
  resumePromptIn,
  type SeatStep,
} from "akasha/code/editor/extension/seat-toggles/seat-toggles.module.code.ts"
import * as vscode from "vscode"

const inFlight = new Set<string>()

async function runSeat(call: SeatCall): Promise<undefined> {
  await callHarness(call.slug, call.exported, call.args, { timeout: LANDING_TIMEOUT_MS })
  return undefined
}

async function attachTerminal(seat: ToggleTarget, line: string): Promise<undefined> {
  const column = await columnForSeat(seat, readSeatLookup() ?? new Map<number, string>())
  output.appendLine(`[attach] ${seat.name}: terminal in column ${column.column} (${column.reason})`)
  const terminal = vscode.window.createTerminal(seatTerminalOptions(seat.name, column.column))
  terminal.sendText(line)
  terminal.show()
  return undefined
}

async function resumeInteractive(seat: ToggleTarget): Promise<undefined> {
  const line = attachCommandLine(seat.name)
  await runSeat(interactiveCall(seat.name))
  return attachTerminal(seat, line)
}

async function performStep(seat: ToggleTarget, step: SeatStep): Promise<undefined> {
  switch (step.kind) {
    case "stop":
      await runSeat(stopCall(seat.name))
      return undefined
    case "revive": {
      const said = await callHarness(NOTICES_CALL.slug, NOTICES_CALL.exported, NOTICES_CALL.args, {
        timeout: LANDING_TIMEOUT_MS,
      })
      const prompt = resumePromptIn(said)
      await runSeat(revivingCall(seat.name, prompt))
      return undefined
    }
    case "resume-interactive":
      return resumeInteractive(seat)
    case "attach":
      return attachTerminal(seat, attachCommandLine(seat.name))
    case "reset":
      await runSeat(resetCall(seat.name))
      return undefined
    default: {
      const unreached: never = step
      throw new Error(`unknown seat step: ${JSON.stringify(unreached)}`)
    }
  }
}

export async function performPlan(
  seat: ToggleTarget,
  steps: readonly SeatStep[],
  trigger: string
): Promise<undefined> {
  if (inFlight.has(seat.id)) {
    output.appendLine(`[${trigger}] ${seat.name}: already acting on this seat, ignoring`)
    return undefined
  }
  inFlight.add(seat.id)
  try {
    for (const step of steps) {
      try {
        await performStep(seat, step)
        output.appendLine(`[${trigger}] ${seat.name}: ${step.kind} ok`)
      } catch (err) {
        const said = err instanceof Error ? err.message : String(err)
        output.appendLine(`[${trigger}] ${seat.name}: ${step.kind} failed: ${said}`)
        void vscode.window.showErrorMessage(`${seat.name}: could not ${step.kind}. ${said}`)
        return undefined
      }
    }
  } finally {
    inFlight.delete(seat.id)
  }
  return undefined
}
