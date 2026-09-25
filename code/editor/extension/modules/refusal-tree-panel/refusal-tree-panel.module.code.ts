import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type RefusalTreeState,
  refusalTreeStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import {
  REFRESH_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/modules/refusal-tree-ids/refusal-tree-ids.module.code.ts"
import { createRefusalTree } from "akasha/code/editor/extension/modules/refusal-tree-view/refusal-tree-view.module.code.ts"
import * as vscode from "vscode"
import "akasha/alan/harness/code-editor/data-interface/pages/refusal-tree/refusal-tree.code-editor-data-interface.d.ts"

const FEATURE = "refusal-tree"
const SLUG = "refusal-tree"

let output: vscode.OutputChannel

function totalOf(roots: readonly RefusalTreeRow[]): number {
  let total = 0
  for (const row of roots) total += row.refusals
  return total
}

function counted(total: number): string {
  return total === 1 ? "1 refusal" : `${total} refusals`
}

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Refusal Tree")
  context.subscriptions.push(output)

  const tree = createRefusalTree(akashaRoot())
  const view = vscode.window.createTreeView<RefusalTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the refusals…"
  context.subscriptions.push(tree, view)

  let total = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description = matched === undefined ? counted(total) : `${matched} matching rows`
    return undefined
  }

  let held: RefusalTreeState | null = null

  let owed = false

  const draw = (state: RefusalTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      total = totalOf(state.roots)
      describe()
      view.badge = { value: total, tooltip: counted(total) }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${total} refusal(s) under ${state.roots.length} root(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} the nesting never reached: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          refusals: total,
          roots: state.roots.length,
          unreached: state.unreached.length,
        },
      })
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: RefusalTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState(stateAt(akashaRoot(), SLUG), refusalTreeStateSchema)
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState(akashaRoot(), SLUG, refusalTreeStateSchema, (state) =>
    show(state, "refusals")
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
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )
  return undefined
}
