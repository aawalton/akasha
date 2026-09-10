import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import { describedAs } from "../tree-description/tree-description.module.code.ts"
import { deletingIntent } from "../work-tree-deleting/work-tree-deleting.module.code.ts"
import {
  agreementOf,
  createWorkDragging,
  intentLabelsIn,
  movedLabels,
  type Ordering,
  reorderedTo,
} from "../work-tree-dragging/work-tree-dragging.module.code.ts"
import {
  DELETE_INTENT_COMMAND,
  REFRESH_COMMAND,
  VIEW_ID,
} from "../work-tree-ids/work-tree-ids.module.code.ts"
import {
  countOfKind,
  countRows,
  workKeys,
} from "../work-tree-reading/work-tree-reading.module.code.ts"
import {
  createWorkDecorationProvider,
  createWorkTree,
} from "../work-tree-view/work-tree-view.module.code.ts"

const FEATURE = "work-tree"
const SLUG = "work-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Work Tree")
  context.subscriptions.push(output)

  const holding = new Map<string, readonly string[]>()
  let drawn: readonly WorkTreeRow[] = []

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
        refused: (order) => letGo(order),
      }
    ),
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the initiatives…"
  context.subscriptions.push(tree, view)

  let total = 0

  const settled = (roots: readonly WorkTreeRow[]): readonly WorkTreeRow[] => {
    let rows = roots
    for (const [slug, labels] of [...holding]) {
      if (agreementOf(intentLabelsIn(rows, slug), labels) === "stale") {
        rows = reorderedTo(rows, { slug, labels })
        continue
      }
      holding.delete(slug)
    }
    return rows
  }

  const draw = (held: WorkTreeState, trigger: string): undefined => {
    try {
      const roots = settled(held.roots)
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
    const held = readState<WorkTreeState>(stateAt(akashaRoot(), SLUG))
    if (held === null) {
      return undefined
    }
    return draw(held, trigger)
  }

  const holdMoved = (order: Ordering): undefined => {
    const labels = movedLabels(intentLabelsIn(drawn, order.slug), order.from, order.to)
    if (labels === null) return undefined
    holding.set(order.slug, labels)
    return draw({ roots: drawn }, "drop")
  }

  const letGo = (order: Ordering): undefined => {
    holding.delete(order.slug)
    return refresh("refused")
  }

  const reading = followState<WorkTreeState>(akashaRoot(), SLUG, (held) => draw(held, "work"))

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
      deletingIntent(vscode, (line) => {
        output.appendLine(line)
        return undefined
      })(row)
    )
  )
  return undefined
}
