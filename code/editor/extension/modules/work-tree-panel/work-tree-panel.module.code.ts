import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type WorkTreeState,
  workTreeStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.code.ts"
import { seatsByName } from "akasha/code/editor/extension/modules/agent-tree-lookup/agent-tree-lookup.module.code.ts"
import { forest } from "akasha/code/editor/extension/modules/agent-tree-state/agent-tree-state.module.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import { describedAs } from "akasha/code/editor/extension/modules/tree-description/tree-description.module.code.ts"
import {
  type Assigning,
  assigningInitiative,
  type WorkAssignWatch,
} from "akasha/code/editor/extension/modules/work-tree-assigning/work-tree-assigning.module.code.ts"
import {
  deletingInitiative,
  deletingIntent,
  type IntentGone,
  type WorkDeleteWatch,
} from "akasha/code/editor/extension/modules/work-tree-deleting/work-tree-deleting.module.code.ts"
import {
  createWorkDragging,
  type Ordering,
} from "akasha/code/editor/extension/modules/work-tree-dragging/work-tree-dragging.module.code.ts"
import {
  type Holding,
  heldAnswered,
  heldColored,
  heldGone,
  heldMoved,
  heldWithout,
  intentLabelsIn,
  settledOver,
} from "akasha/code/editor/extension/modules/work-tree-holding/work-tree-holding.module.code.ts"
import {
  ASSIGN_COMMAND,
  DELETE_INITIATIVE_COMMAND,
  DELETE_INTENT_COMMAND,
  REFRESH_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/modules/work-tree-ids/work-tree-ids.module.code.ts"
import {
  countOfKind,
  countRows,
  workKeys,
} from "akasha/code/editor/extension/modules/work-tree-reading/work-tree-reading.module.code.ts"
import {
  createWorkDecorationProvider,
  createWorkTree,
} from "akasha/code/editor/extension/modules/work-tree-view/work-tree-view.module.code.ts"
import * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.d.ts"

const FEATURE = "work-tree"
const SLUG = "work-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Work Tree")
  context.subscriptions.push(output)

  const holding = new Map<string, Holding>()
  let drawn: readonly WorkTreeRow[] = []
  let filed: readonly WorkTreeRow[] = []

  const tree = createWorkTree(akashaRoot())
  const view = vscode.window.createTreeView<WorkTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    dragAndDropController: createWorkDragging(
      vscode,
      (line) => {
        output.appendLine(line)
        return undefined
      },
      {
        moving: (order) => holdMoved(order),
        handing: (one) => holdWithout({ slug: one.from, statement: one.statement }),
        answered: (slug) => answered(slug),
        refused: (slug) => letGo(slug),
      }
    ),
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the initiatives…"
  context.subscriptions.push(tree, view)

  let total = 0

  const draw = (held: WorkTreeState, trigger: string): undefined => {
    try {
      filed = held.roots
      const roots = settledOver(held.roots, holding)
      tree.replace(roots)
      drawn = roots
      const rows = countRows(roots)
      const initiatives = countOfKind(roots, "initiative")
      const intents = countOfKind(roots, "intent")
      total = rows
      view.description = describedAs(tree.matchCount(), total)
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      const keys = workKeys(roots)
      const duplicated = keys.filter((key, at) => keys.indexOf(key) !== at)
      output.appendLine(`[${trigger}] ${initiatives} initiative(s), ${intents} intent(s)`)
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: { initiatives, intents, drawnMoreThanOnce: new Set(duplicated).size },
      })
      if (duplicated.length > 0) {
        output.appendLine(
          `[${trigger}] drawn more than once: ${[...new Set(duplicated)].join(", ")}`
        )
        void vscode.window.showWarningMessage(
          `Work: ${new Set(duplicated).size} row(s) are drawn more than once. ` +
            "See the Ops: Work Tree output."
        )
      }
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const refresh = (trigger: string): undefined => {
    const held = readState(stateAt(akashaRoot(), SLUG), workTreeStateSchema)
    if (held === null) {
      return undefined
    }
    return draw(held, trigger)
  }

  const holdMoved = (order: Ordering): undefined => {
    const held = heldMoved(
      holding.get(order.slug),
      intentLabelsIn(drawn, order.slug),
      order.statement,
      order.onto
    )
    if (held === null) return undefined
    holding.set(order.slug, held)
    return draw({ roots: filed }, "drop")
  }

  const holdWithout = (one: IntentGone): undefined => {
    const held = heldWithout(holding.get(one.slug), intentLabelsIn(drawn, one.slug), one.statement)
    if (held === null) return undefined
    holding.set(one.slug, held)
    return draw({ roots: filed }, "delete")
  }

  const holdGone = (slug: string): undefined => {
    holding.set(slug, heldGone(holding.get(slug)))
    return draw({ roots: filed }, "delete")
  }

  const holdColored = (one: Assigning): undefined => {
    const color = seatsByName(forest).get(one.seat)?.color ?? null
    if (color === null) {
      output.appendLine(`[assign] ${one.slug}: the agents panel draws ${one.seat} in no color`)
      return undefined
    }
    holding.set(one.slug, heldColored(holding.get(one.slug), color, one.seat))
    return draw({ roots: filed }, "assign")
  }

  const answered = (slug: string): undefined => {
    const held = heldAnswered(holding.get(slug))
    if (held !== null) holding.set(slug, held)
    return undefined
  }

  const letGo = (slug: string): undefined => {
    const held = holding.get(slug)
    if (held?.kind === "color") {
      output.appendLine(`[assign] ${slug}: the color held for ${held.seat} is let go`)
    }
    holding.delete(slug)
    return refresh("refused")
  }

  const deleting: WorkDeleteWatch = {
    intentGoing: (one) => holdWithout(one),
    initiativeGoing: (slug) => holdGone(slug),
    answered: (slug) => answered(slug),
    stayed: (slug) => letGo(slug),
  }

  const assigning: WorkAssignWatch = {
    assigning: (one) => holdColored(one),
    answered: (slug) => answered(slug),
    stayed: (slug) => letGo(slug),
  }

  const said = (line: string): undefined => {
    output.appendLine(line)
    return undefined
  }

  const reading = followState(akashaRoot(), SLUG, workTreeStateSchema, (held) => draw(held, "work"))

  context.subscriptions.push(
    {
      dispose: () => {
        reading.stop()
      },
    },
    view.onDidChangeFilterValue((pattern) => {
      tree.filter(pattern)
      view.description = describedAs(tree.matchCount(), total)
    }),
    vscode.window.registerFileDecorationProvider(createWorkDecorationProvider()),
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual")),
    vscode.commands.registerCommand(DELETE_INTENT_COMMAND, (row?: WorkTreeRow) =>
      deletingIntent(vscode, said, deleting)(row)
    ),
    vscode.commands.registerCommand(DELETE_INITIATIVE_COMMAND, (row?: WorkTreeRow) =>
      deletingInitiative(vscode, said, deleting)(row)
    ),
    vscode.commands.registerCommand(ASSIGN_COMMAND, (row?: WorkTreeRow) =>
      assigningInitiative(vscode, said, assigning)(row)
    )
  )
  return undefined
}
