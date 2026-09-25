import { followState } from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type TerminalTabsState,
  terminalTabsStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/terminal-tabs/terminal-tabs.code-editor-data-interface.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { newestWins } from "akasha/code/editor/extension/modules/newest-wins/newest-wins.module.code.ts"
import {
  recordObservation,
  recordSweep,
} from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import { colorNamed } from "akasha/code/editor/extension/modules/palette/palette.module.code.ts"
import {
  lastAppliedByTerminal,
  lastColorByTerminal,
} from "akasha/code/editor/extension/modules/terminal-marks/terminal-marks.module.code.ts"
import {
  PROCESS_ID_TIMEOUT_MS,
  readProcessIds,
  tally,
} from "akasha/code/editor/extension/modules/terminal-pids/terminal-pids.module.code.ts"
import { syncTerminal } from "akasha/code/editor/extension/modules/terminal-sync/terminal-sync.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "terminal-rename"
const SLUG = "terminal-tabs"

let output: vscode.OutputChannel

let tabs: TerminalTabsState | null = null

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  output = vscode.window.createOutputChannel("Ops")
  context.subscriptions.push(output)

  const reading = followState(akashaRoot(), SLUG, terminalTabsStateSchema, (held) => {
    tabs = held
    void applyAll("tabs")
    return undefined
  })

  context.subscriptions.push(
    {
      dispose: () => {
        reading.stop()
      },
    },
    vscode.window.onDidOpenTerminal(() => void applyAll("open")),
    vscode.window.onDidChangeActiveTerminal(() => void applyAll("focus")),
    vscode.window.onDidCloseTerminal((t) => {
      lastAppliedByTerminal.delete(t)
      lastColorByTerminal.delete(t)
    }),
    vscode.commands.registerCommand("agentTerminalName.syncNow", () => applyAll("manual"))
  )
  output.appendLine(`activated; reading what the service writes for ${SLUG}`)
}

const applyAll = newestWins<string>(applyOnce)

async function applyOnce(trigger: string): Promise<undefined> {
  const held = tabs
  if (held === null) return undefined
  const terminals = vscode.window.terminals
  if (terminals.length === 0) return undefined
  try {
    const began = Date.now()
    const readings = await readProcessIds(terminals)
    const ms = Date.now() - began
    recordSweep(FEATURE, { ...tally(readings), boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger })
    await Promise.all(
      readings.map((reading, index) => {
        const name =
          reading.outcome === "read" ? held.seatByShellPid[String(reading.pid)] : undefined
        const named = name === undefined ? undefined : held.colorBySeat[name]
        const color = named === undefined ? undefined : colorNamed(named)
        return syncTerminal(reading, name, index, terminals.length, color, trigger, output)
      })
    )
    recordObservation(FEATURE, {
      outcome: "ok",
      counts: { named: lastAppliedByTerminal.size, colored: lastColorByTerminal.size },
    })
  } catch (err) {
    output.appendLine(`[${trigger}] naming failed: ${String(err)}`)
    recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
  }
  return undefined
}
