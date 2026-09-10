import * as vscode from "vscode"
import { output } from "../agent-tree-state/agent-tree-state.module.code.ts"
import { seatTerminalOptions } from "../editor-group/editor-group.module.code.ts"
import { callHarness } from "../harness-call/harness-call.module.code.ts"
import type { ToggleTarget } from "../invoked-seat/invoked-seat.module.code.ts"
import { columnForSeat } from "../seat-showing/seat-showing.module.code.ts"
import { readSeatLookup } from "../seat-terminals/seat-terminals.module.code.ts"
import {
  attachCommandLine,
  resumePrompt,
  type SeatStep,
} from "../seat-toggles/seat-toggles.module.code.ts"

const SEAT_TIMEOUT_MS = 120_000

const RESUME_MODULE = "seat-resume"

const RESUME_EXPORT = "seatResume"

const RESET_MODULE = "seat-reset"

const RESET_EXPORT = "seatReset"

const STOP_MODULE = "seat-supervisor-stop"

const STOP_EXPORT = "seatSupervisorStop"

const inFlight = new Set<string>()

async function runSeat(
  module: string,
  exported: string,
  args: readonly string[]
): Promise<undefined> {
  await callHarness(module, exported, args, { timeout: SEAT_TIMEOUT_MS })
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
  await runSeat(RESUME_MODULE, RESUME_EXPORT, [seat.name, "--start-mode", "interactive"])
  return attachTerminal(seat, line)
}

async function performStep(seat: ToggleTarget, step: SeatStep): Promise<undefined> {
  switch (step.kind) {
    case "stop":
      await runSeat(STOP_MODULE, STOP_EXPORT, [seat.name])
      return undefined
    case "revive": {
      const prompt = resumePrompt()
      await runSeat(RESUME_MODULE, RESUME_EXPORT, [seat.name, "--prompt", prompt])
      return undefined
    }
    case "resume-interactive":
      return resumeInteractive(seat)
    case "attach":
      return attachTerminal(seat, attachCommandLine(seat.name))
    case "reset":
      await runSeat(RESET_MODULE, RESET_EXPORT, [seat.name])
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
        output.appendLine(`[${trigger}] ${seat.name}: ${step.kind} failed: ${String(err)}`)
        void vscode.window.showErrorMessage(`${seat.name}: could not ${step.kind}. ${String(err)}`)
        return undefined
      }
    }
  } finally {
    inFlight.delete(seat.id)
  }
  return undefined
}
