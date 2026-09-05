import * as vscode from "vscode"
import { followState } from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import {
  recordObservation,
  recordSweep,
} from "../observation-store/observation-store.module.code.ts"
import { colorNamed } from "../palette/palette.module.code.ts"
import {
  lastAppliedByTerminal,
  lastColorByTerminal,
} from "../terminal-marks/terminal-marks.module.code.ts"
import {
  PROCESS_ID_TIMEOUT_MS,
  readProcessIds,
  tally,
} from "../terminal-pids/terminal-pids.module.code.ts"
import { syncTerminal } from "../terminal-sync/terminal-sync.module.code.ts"

const FEATURE = "terminal-rename"
const SLUG = "terminal-tabs"

let output: vscode.OutputChannel

// The seat each terminal sits on, as the service last wrote it. Null until one has been read, and
// a run over a null picture would name every terminal as seatless and reset the lot, so a run over
// one is not made at all.
let tabs: TerminalTabsState | null = null

export async function activate(context: vscode.ExtensionContext): Promise<void> {
  output = vscode.window.createOutputChannel("Ops")
  context.subscriptions.push(output)

  const reading = followState<TerminalTabsState>(akashaRoot(), SLUG, (held) => {
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

let applying: Promise<void> | undefined

async function applyAll(trigger: string): Promise<void> {
  const inFlight = applying
  if (inFlight !== undefined) {
    await inFlight
    return
  }
  const started = applyOnce(trigger)
  applying = started
  try {
    await started
  } finally {
    applying = undefined
  }
}

// A terminal answers its own process id and nothing else names a seat, so the pid is what the seat
// is looked up by. Every other fact this used to work out — which seats are there, which shell
// each tmux client runs under, what color each turn is — the service worked out once for the
// workstation and wrote in the picture above.
async function applyOnce(trigger: string): Promise<void> {
  const held = tabs
  if (held === null) return
  const terminals = vscode.window.terminals
  if (terminals.length === 0) return
  try {
    const began = Date.now()
    const readings = await readProcessIds(terminals)
    const ms = Date.now() - began
    recordSweep(FEATURE, { ...tally(readings), boundMs: PROCESS_ID_TIMEOUT_MS, ms, trigger })
    await Promise.all(
      readings.map((reading, index) => {
        const name =
          reading.outcome === "read" ? held.seatByShellPid[String(reading.pid)] : undefined
        // The service writes the name of a color, not something the editor can draw, so the
        // palette is read here. Handing the name straight to `recolor` left every tab uncolored.
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
}
