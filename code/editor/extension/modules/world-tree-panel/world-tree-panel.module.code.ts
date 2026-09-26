import { followState } from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type WorldTreeRow,
  type WorldTreeState,
  worldTreeStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/world-tree/world-tree.code-editor-data-interface.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import { describedAs } from "akasha/code/editor/extension/modules/tree-description/tree-description.module.code.ts"
import {
  OPEN_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/modules/world-tree-ids/world-tree-ids.module.code.ts"
import { createWorldTree } from "akasha/code/editor/extension/modules/world-tree-view/world-tree-view.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "world-tree"
const SLUG = "world-tree"

function countRows(rows: readonly WorldTreeRow[]): number {
  return rows.reduce((total, row) => total + 1 + countRows(row.children), 0)
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  const output = vscode.window.createOutputChannel("Ops: Worlds")
  context.subscriptions.push(output)

  const tree = createWorldTree()
  const view = vscode.window.createTreeView<WorldTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the worlds…"
  context.subscriptions.push(tree, view)

  let total = 0

  const draw = (state: WorldTreeState): undefined => {
    try {
      tree.replace(state.roots)
      total = countRows(state.roots)
      view.description = describedAs(tree.matchCount(), total)
      view.badge = { value: total, tooltip: total === 1 ? "1 row" : `${total} rows` }
      view.message = undefined
      output.appendLine(
        `[worlds] ${total} row(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} story(s) under no world: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: { rows: total, unreached: state.unreached.length },
      })
    } catch (err) {
      output.appendLine(`[worlds] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const reading = followState(akashaRoot(), SLUG, worldTreeStateSchema, draw)

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
    vscode.commands.registerCommand(OPEN_COMMAND, async (url: unknown) => {
      if (typeof url !== "string") return undefined
      await vscode.env.openExternal(vscode.Uri.parse(url))
      output.appendLine(`[open] ${url}`)
      return undefined
    })
  )
  return undefined
}
