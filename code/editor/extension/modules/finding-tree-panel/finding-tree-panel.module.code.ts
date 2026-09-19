import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  DELETE_COMMAND,
  REFRESH_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/modules/finding-tree-ids/finding-tree-ids.module.code.ts"
import { createFindingTree } from "akasha/code/editor/extension/modules/finding-tree-view/finding-tree-view.module.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import { deletingFinding } from "akasha/code/editor/extension/modules/tree-row-deleting/tree-row-deleting.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "finding-tree"
const SLUG = "finding-tree"

let output: vscode.OutputChannel

function totalOf(roots: readonly FindingTreeRow[]): number {
  let total = 0
  for (const row of roots) total += row.findings
  return total
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Finding Tree")
  context.subscriptions.push(output)

  const tree = createFindingTree(akashaRoot())
  const view = vscode.window.createTreeView<FindingTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the findings…"
  context.subscriptions.push(tree, view)

  let total = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description =
      matched === undefined
        ? total === 1
          ? "1 finding"
          : `${total} findings`
        : `${matched} matching rows`
    return undefined
  }

  let held: FindingTreeState | null = null

  let owed = false

  const draw = (state: FindingTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      total = totalOf(state.roots)
      describe()
      view.badge = {
        value: total,
        tooltip: total === 1 ? "1 finding" : `${total} findings`,
      }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${total} finding(s) under ${state.roots.length} root(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} naming no domain: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          findings: total,
          roots: state.roots.length,
          namingNoDomain: state.unreached.length,
        },
      })
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: FindingTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState<FindingTreeState>(stateAt(akashaRoot(), SLUG))
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState<FindingTreeState>(akashaRoot(), SLUG, (state) =>
    show(state, "findings")
  )

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
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual")),
    vscode.commands.registerCommand(DELETE_COMMAND, (row?: FindingTreeRow) =>
      deletingFinding(vscode, (line) => {
        output.appendLine(line)
        return undefined
      })(row)
    )
  )
  return undefined
}
