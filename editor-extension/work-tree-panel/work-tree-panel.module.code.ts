import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import { describedAs } from "../tree-description/tree-description.module.code.ts"
import { createWorkDragging } from "../work-tree-dragging/work-tree-dragging.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../work-tree-ids/work-tree-ids.module.code.ts"
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

  const tree = createWorkTree(akashaRoot())
  const view = vscode.window.createTreeView<WorkTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    dragAndDropController: createWorkDragging(vscode, (line) => {
      output.appendLine(line)
      return undefined
    }),
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the initiatives…"
  context.subscriptions.push(tree, view)

  let total = 0

  const draw = (held: WorkTreeState, trigger: string): undefined => {
    try {
      tree.replace(held.roots)
      const rows = countRows(held.roots)
      const initiatives = countOfKind(held.roots, "initiative")
      const intents = countOfKind(held.roots, "intent")
      total = rows
      view.description = describedAs(tree.matchCount(), total)
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      const keys = workKeys(held.roots)
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
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )
  return undefined
}
