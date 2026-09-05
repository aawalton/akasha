import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import type { PageNode, PageTree } from "../page-tree-assemble/page-tree-assemble.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../page-tree-ids/page-tree-ids.module.code.ts"
import { countPages, countRows } from "../page-tree-reading/page-tree-reading.module.code.ts"
import { createPageTree } from "../page-tree-view/page-tree-view.module.code.ts"

const FEATURE = "page-tree"
const SLUG = "page-tree"

// The file spells a row the way every state file spells one. The panel spells it another way, so
// the two are bridged here. The document needs no work: the file names it by a whole path and the
// panel opens exactly that.
function asNode(row: PageTreeRow): PageNode {
  return {
    id: row.key,
    label: row.label,
    at: row.at,
    detail: row.detail,
    children: row.children.map(asNode),
  }
}

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Page Tree")
  context.subscriptions.push(output)

  const tree = createPageTree()
  const view = vscode.window.createTreeView<PageNode>(VIEW_ID, {
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

  // What the file last said, drawn or waiting to be drawn.
  let held: PageTreeState | null = null

  // The file moved while nobody was looking at the panel. Nothing was drawn for it, and the
  // drawing is owed until the panel is looked at again.
  let owed = false

  const draw = (state: PageTreeState, trigger: string): undefined => {
    try {
      const next: PageTree = {
        repo: akashaRoot(),
        roots: state.roots.map(asNode),
        unreached: state.unreached,
      }
      tree.replace(next)
      const rows = countRows(next.roots)
      const pages = countPages(next.roots)
      total = rows
      describe()
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${rows} row(s), ${pages} of them opening a document, ` +
          `under ${next.roots.length} root(s)` +
          (next.unreached.length === 0
            ? ""
            : `; ${next.unreached.length} reached by no root: ${next.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          rows,
          pages,
          roots: next.roots.length,
          reachedByNoRoot: next.unreached.length,
        },
      })
      if (next.unreached.length > 0) {
        void vscode.window.showWarningMessage(
          `Pages: ${next.unreached.length} page type(s) hang under no root and are not shown. ` +
            "See the Ops: Page Tree output."
        )
      }
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  // NOTHING IS DRAWN FOR A PANEL NOBODY IS LOOKING AT. The Pages view shares the secondary sidebar
  // with Agents, Work and Domains, so it is hidden most of the time, and rebuilding five thousand
  // rows for a hidden view spends the extension host's thread on nothing Alan can see. The state
  // is kept all the same, so becoming visible draws what the file says now.
  const show = (state: PageTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  // Asking for the file again answers a manual refresh at once rather than waiting to be told.
  // A file the service has not written leaves the rows on the screen as they are.
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
