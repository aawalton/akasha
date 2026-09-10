import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../../../alan/harness/code-editor/data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../page-tree-ids/page-tree-ids.module.code.ts"
import { countPages, countRows } from "../page-tree-reading/page-tree-reading.module.code.ts"
import { createPageTree } from "../page-tree-view/page-tree-view.module.code.ts"

const FEATURE = "page-tree"
const SLUG = "page-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Page Tree")
  context.subscriptions.push(output)

  const tree = createPageTree()
  const view = vscode.window.createTreeView<PageTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the pages…"
  context.subscriptions.push(tree, view)

  let total = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description =
      matched === undefined ? (total === 1 ? "1 row" : `${total} rows`) : `${matched} of ${total}`
    return undefined
  }

  let held: PageTreeState | null = null

  let owed = false

  const draw = (state: PageTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      const rows = countRows(state.roots)
      const pages = countPages(state.roots)
      total = rows
      describe()
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${rows} row(s), ${pages} of them opening a document, ` +
          `under ${state.roots.length} root(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} reached by no root: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          rows,
          pages,
          roots: state.roots.length,
          reachedByNoRoot: state.unreached.length,
        },
      })
      if (state.unreached.length > 0) {
        void vscode.window.showWarningMessage(
          `Pages: ${state.unreached.length} page type(s) hang under no root and are not shown. ` +
            "See the Ops: Page Tree output."
        )
      }
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: PageTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState<PageTreeState>(stateAt(akashaRoot(), SLUG))
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState<PageTreeState>(akashaRoot(), SLUG, (state) => show(state, "pages"))

  context.subscriptions.push(
    {
      dispose: () => {
        reading.stop()
      },
    },
    view.onDidChangeVisibility((event) => {
      if (!event.visible || !owed || held === null) {
        return
      }
      owed = false
      draw(held, "shown")
    }),
    view.onDidChangeFilterValue((pattern) => {
      tree.filter(pattern)
      describe()
    }),
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )
  return undefined
}
