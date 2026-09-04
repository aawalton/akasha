import * as vscode from "vscode"
import { countRows } from "../agent-forest/agent-forest.module.code.ts"
import {
  dropSeatAnswers,
  readAgentForest,
} from "../agent-forest-reading/agent-forest-reading.module.code.ts"
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
  PLACE_HEADLESS_COMMAND,
  PLACE_INTERACTIVE_COMMAND,
  POLL_INTERVAL_MS,
  REFRESH_COMMAND,
  RUN_RESET_COMMAND,
  RUN_RESUME_COMMAND,
  RUN_STOP_COMMAND,
  SEAT_SETTLE_MS,
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
import { unreachableMessage } from "../harness-call/harness-call.module.code.ts"
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
  planPlaceToggle,
  planReset,
  planRunToggle,
  type SeatStep,
  type SeatToggleState,
} from "../seat-toggles/seat-toggles.module.code.ts"
import { SEAT_SIDECAR_GLOB, seatDirs } from "../seat-turn-colors/seat-turn-colors.module.code.ts"
import { createSubagentReader } from "../subagent-reading/subagent-reading.module.code.ts"

const FEATURE = "agent-tree"

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
  const subagents = createSubagentReader()
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

  const readOnce = async (trigger: string): Promise<undefined> => {
    const sampled = await sampleColumns(trigger, FEATURE)
    if (sampled !== undefined) {
      setSeatTerminals(sampled)
    }
    try {
      const forestRead = await readAgentForest(subagents)
      const { roots, alanPrincipalCount, runningCount, unreadSeats, unreadSaid } = forestRead
      setForest(roots)
      tree.replace(roots)
      running = runningCount
      describe()
      view.badge = {
        value: runningCount,
        tooltip: runningCount === 1 ? "1 agent running" : `${runningCount} agents running`,
      }
      view.message =
        unreadSeats === 0
          ? undefined
          : `${unreadSeats} seat(s) went unread — the subagents under them are missing`
      output.appendLine(
        `[${trigger}] ${runningCount} running, ${countRows(roots)} rows, ` +
          `${roots.length} roots, ${alanPrincipalCount} answering to Alan` +
          (unreadSeats === 0 ? "" : `, ${unreadSeats} seat(s) UNREAD — ${unreadSaid ?? ""}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          running: runningCount,
          rows: countRows(roots),
          roots: roots.length,
          answeringToAlan: alanPrincipalCount,
          unreadSeats,
        },
      })
    } catch (err) {
      view.message = unreachableMessage(err)
      output.appendLine(`[${trigger}] read failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    await publishSeatTabs(trigger)
    return undefined
  }

  let reading: Promise<undefined> | undefined

  const refresh = async (trigger: string): Promise<undefined> => {
    const inFlight = reading
    if (inFlight !== undefined) {
      output.appendLine(`[${trigger}] a read is already in flight — waiting for it`)
      await inFlight
      return undefined
    }
    const started = readOnce(trigger)
    reading = started
    try {
      await started
    } finally {
      reading = undefined
    }
    return undefined
  }

  const timer = setInterval(() => void refresh("poll"), POLL_INTERVAL_MS)

  let settling: ReturnType<typeof setTimeout> | undefined
  const followSeats = (): void => {
    if (settling !== undefined) {
      clearTimeout(settling)
    }
    settling = setTimeout(() => {
      settling = undefined
      dropSeatAnswers()
      void refresh("seat")
    }, SEAT_SETTLE_MS)
  }
  context.subscriptions.push(
    ...seatDirs().map((dir) => {
      const seats = vscode.workspace.createFileSystemWatcher(
        new vscode.RelativePattern(vscode.Uri.file(dir), SEAT_SIDECAR_GLOB)
      )
      seats.onDidChange(followSeats)
      seats.onDidCreate(followSeats)
      seats.onDidDelete(followSeats)
      return seats
    }),
    {
      dispose: () => {
        if (settling !== undefined) {
          clearTimeout(settling)
        }
      },
    }
  )

  context.subscriptions.push(
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
    { dispose: () => clearInterval(timer) },
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual")),
    vscode.commands.registerCommand(PLACE_INTERACTIVE_COMMAND, (n: unknown) =>
      runPlan(n, planPlaceToggle, "place-interactive")
    ),
    vscode.commands.registerCommand(PLACE_HEADLESS_COMMAND, (n: unknown) =>
      runPlan(n, planPlaceToggle, "place-headless")
    ),
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

  await refresh("activate")
  return undefined
}
