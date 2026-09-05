import { relative } from "node:path"
import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../work-tree-ids/work-tree-ids.module.code.ts"
import { countRows, workKeys } from "../work-tree-reading/work-tree-reading.module.code.ts"
import type { WorkNode, WorkTree } from "../work-tree-rows/work-tree-rows.module.code.ts"
import {
  createWorkDecorationProvider,
  createWorkTree,
} from "../work-tree-view/work-tree-view.module.code.ts"

const FEATURE = "work-tree"
const SLUG = "work-tree"

// The file spells a row the way every state file spells one, and the panel spells it another way.
// The document is the one field that differs in kind rather than in name: the file carries the
// whole path, the panel carries it against the repository, and `documentPath` puts them back
// together. Taking the repository away from the path here is what makes that join exact.
//
// A color is carried on as the name it is. The decoration provider puts that name in a uri path
// and matches it against the palette, so a color turned into something drawable here would fail
// that match and leave the row uncolored.
function asNode(row: WorkTreeRow, root: string): WorkNode {
  return {
    key: row.key,
    label: row.label,
    relPath: row.at === null ? null : relative(root, row.at),
    detail: row.detail,
    note: row.note,
    color: row.color,
    children: row.children.map((child) => asNode(child, root)),
  }
}

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Work Tree")
  context.subscriptions.push(output)

  const tree = createWorkTree()
  const view = vscode.window.createTreeView<WorkNode>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the initiatives…"
  context.subscriptions.push(tree, view)

  let total = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description =
      matched === undefined ? (total === 1 ? "1 row" : `${total} rows`) : `${matched} of ${total}`
    return undefined
  }

  const draw = (held: WorkTreeState, trigger: string): undefined => {
    const root = akashaRoot()
    try {
      const next: WorkTree = { repo: root, roots: held.roots.map((row) => asNode(row, root)) }
      tree.replace(next)
      const rows = countRows(next.roots)
      total = rows
      describe()
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      const keys = workKeys(next.roots)
      const duplicated = keys.filter((key, at) => keys.indexOf(key) !== at)
      output.appendLine(`[${trigger}] ${rows} initiative(s)`)
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: { initiatives: rows, drawnMoreThanOnce: new Set(duplicated).size },
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

  // Asking for the file again answers a manual refresh at once rather than waiting to be told.
  // A file the service has not written leaves the rows on the screen as they are.
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
      describe()
    }),
    vscode.window.registerFileDecorationProvider(createWorkDecorationProvider()),
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )
  return undefined
}
