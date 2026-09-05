import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { countRows } from "../agent-forest/agent-forest.module.code.ts"
import { openAgentPage } from "../agent-page-opening/agent-page-opening.module.code.ts"
import type { AgentNode } from "../agent-row/agent-row.module.code.ts"
import {
  createAgentDecorationProvider,
  createAgentTree,
  REVEAL_TERMINAL_COMMAND,
} from "../agent-tree-drawing/agent-tree-drawing.module.code.ts"
import {
  COPY_SEAT_NAME_COMMAND,
  OPEN_PAGE_COMMAND,
  REFRESH_COMMAND,
  RUN_RESET_COMMAND,
  RUN_RESUME_COMMAND,
  RUN_STOP_COMMAND,
  VIEW_ID,
} from "../agent-tree-ids/agent-tree-ids.module.code.ts"
import { seatsByName } from "../agent-tree-lookup/agent-tree-lookup.module.code.ts"
import {
  forest,
  output,
  seatTerminals,
  setColumns,
  setForest,
  setOutput,
  setSeatTabs,
  setSeatTerminals,
} from "../agent-tree-state/agent-tree-state.module.code.ts"
import { createColumnMemory } from "../column-memory/column-memory.module.code.ts"
import { sampleColumns } from "../column-sampling/column-sampling.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { invokedSeat } from "../invoked-seat/invoked-seat.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import type { SeatAct } from "../seat-act-confirm/seat-act-confirm.module.code.ts"
import { runPlan as runPlanWith } from "../seat-plan-running/seat-plan-running.module.code.ts"
import { showSeat } from "../seat-showing/seat-showing.module.code.ts"
import {
  type SeatTabState,
  seatTabContext,
} from "../seat-tab-context/seat-tab-context.module.code.ts"
import { tabInstanceIds } from "../seat-terminals/seat-terminals.module.code.ts"
import {
  planReset,
  planRunToggle,
  type SeatStep,
  type SeatToggleState,
} from "../seat-toggles/seat-toggles.module.code.ts"

const FEATURE = "agent-tree"
const SLUG = "agent-tree"

// The file spells a row the way every state file spells one. The panel spells it another way, and
// so do the payloads vscode hands back when a menu is used, which are read by name at runtime
// rather than checked by the compiler. Bridging the two here keeps that runtime reading untouched.
//
// A color is carried on as the name it is. The decoration provider puts that name in a uri path
// and matches it against the palette, so a color turned into something drawable here would fail
// that match and leave the row uncolored.
function asNode(row: AgentTreeRow): AgentNode {
  return {
    id: row.key,
    name: row.label,
    kind: row.kind,
    place: row.place ?? undefined,
    live: row.live,
    state: row.state ?? undefined,
    waitingOn: row.waitingOn ?? undefined,
    color: row.color ?? undefined,
    at: row.at ?? undefined,
    children: row.children.map(asNode),
  }
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  setOutput(vscode.window.createOutputChannel("Ops: Agent Tree"))
  context.subscriptions.push(output)
  setColumns(createColumnMemory(context.globalState))

  const tree = createAgentTree()
  const view = vscode.window.createTreeView<AgentNode>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the fleet…"
  context.subscriptions.push(
    tree,
    view,
    vscode.window.registerFileDecorationProvider(createAgentDecorationProvider()),
    view.onDidChangeFilterValue((pattern) => {
      tree.filter(pattern)
      describe()
    }),
    vscode.commands.registerCommand(REVEAL_TERMINAL_COMMAND, (clicked: unknown) =>
      showSeat(clicked)
    )
  )

  let running = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description =
      matched === undefined
        ? running === 1
          ? "1 running"
          : `${running} running`
        : `${matched} of ${running} running`
    return undefined
  }

  const publishSeatTabs = async (trigger: string): Promise<undefined> => {
    const ids = tabInstanceIds()
    const seats = seatsByName(forest)
    const tabs: SeatTabState[] = []
    const behind = new Map<number, AgentNode>()
    for (const { name, terminal } of seatTerminals) {
      const instanceId = ids.get(terminal)
      if (instanceId === undefined) {
        continue
      }
      const seat = seats.get(name)
      if (seat === undefined) {
        continue
      }
      tabs.push({ instanceId, live: seat.live, place: seat.place })
      behind.set(instanceId, seat)
    }
    setSeatTabs(behind)
    const values = seatTabContext(tabs)
    for (const [key, published] of Object.entries(values)) {
      await vscode.commands.executeCommand("setContext", key, published)
    }
    output.appendLine(`[${trigger}] ${tabs.length} of ${ids.size} terminal tab(s) hold a seat`)
    return undefined
  }

  const drawOnce = async (held: AgentTreeState, trigger: string): Promise<undefined> => {
    const sampled = await sampleColumns(trigger, FEATURE)
    if (sampled !== undefined) {
      setSeatTerminals(sampled)
    }
    try {
      const roots = held.roots.map(asNode)
      setForest(roots)
      tree.replace(roots)
      running = held.runningCount
      describe()
      view.badge = {
        value: held.runningCount,
        tooltip:
          held.runningCount === 1 ? "1 agent running" : `${held.runningCount} agents running`,
      }
      view.message =
        held.unreadSeats === 0
          ? undefined
          : `${held.unreadSeats} seat(s) went unread — the subagents under them are missing`
      output.appendLine(
        `[${trigger}] ${held.runningCount} running, ${countRows(roots)} rows, ` +
          `${roots.length} roots, ${held.alanPrincipalCount} answering to Alan` +
          (held.unreadSeats === 0 ? "" : `, ${held.unreadSeats} seat(s) UNREAD`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          running: held.runningCount,
          rows: countRows(roots),
          roots: roots.length,
          answeringToAlan: held.alanPrincipalCount,
          unreadSeats: held.unreadSeats,
        },
      })
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    await publishSeatTabs(trigger)
    return undefined
  }

  let drawing: Promise<undefined> | undefined

  const draw = async (held: AgentTreeState, trigger: string): Promise<undefined> => {
    const inFlight = drawing
    if (inFlight !== undefined) {
      await inFlight
      return undefined
    }
    const started = drawOnce(held, trigger)
    drawing = started
    try {
      await started
    } finally {
      drawing = undefined
    }
    return undefined
  }

  // An act on a seat asks for the file again rather than waiting for the service to notice, so the
  // panel answers the act at once. A file the service has not written leaves the rows as they are.
  const refresh = async (trigger: string): Promise<undefined> => {
    const held = readState<AgentTreeState>(stateAt(akashaRoot(), SLUG))
    if (held === null) {
      return undefined
    }
    await draw(held, trigger)
    return undefined
  }

  const reading = followState<AgentTreeState>(akashaRoot(), SLUG, (held) => {
    void draw(held, "fleet")
    return undefined
  })

  context.subscriptions.push(
    {
      dispose: () => {
        reading.stop()
      },
    },
    vscode.window.tabGroups.onDidChangeTabs(() => void publishSeatTabs("tabs"))
  )

  const runPlan = (
    node: unknown,
    plan: (state: SeatToggleState) => readonly SeatStep[],
    act: SeatAct
  ): Promise<undefined> => runPlanWith(node, plan, act, refresh)

  const copySeatName = async (node: unknown): Promise<undefined> => {
    const seat = invokedSeat(node)
    if (seat === undefined) {
      return undefined
    }
    await vscode.env.clipboard.writeText(seat.name)
    output.appendLine(`[copy-seat-name] ${seat.name}: copied`)
    return undefined
  }

  context.subscriptions.push(
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual")),
    vscode.commands.registerCommand(RUN_STOP_COMMAND, (n: unknown) =>
      runPlan(n, planRunToggle, "run-stop")
    ),
    vscode.commands.registerCommand(RUN_RESUME_COMMAND, (n: unknown) =>
      runPlan(n, planRunToggle, "run-resume")
    ),
    vscode.commands.registerCommand(RUN_RESET_COMMAND, (n: unknown) =>
      runPlan(n, planReset, "run-reset")
    ),
    vscode.commands.registerCommand(COPY_SEAT_NAME_COMMAND, (n: unknown) => copySeatName(n)),
    vscode.commands.registerCommand(OPEN_PAGE_COMMAND, (n: unknown) => openAgentPage(n))
  )
  return undefined
}
