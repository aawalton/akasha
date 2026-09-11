import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interfaces/state-reading/state-reading.module.code.ts"
import { countNodes } from "akasha/code/editor/extension/champions-tree/champions-tree.module.code.ts"
import {
  REFRESH_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/domain-tree-ids/domain-tree-ids.module.code.ts"
import { createDomainTree } from "akasha/code/editor/extension/domain-tree-view/domain-tree-view.module.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/observation-store/observation-store.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "domain-tree"
const SLUG = "domain-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Domain Tree")
  context.subscriptions.push(output)

  const tree = createDomainTree(akashaRoot())
  const view = vscode.window.createTreeView<DomainTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the domains…"
  context.subscriptions.push(tree, view)

  let total = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    view.description =
      matched === undefined
        ? total === 1
          ? "1 domain"
          : `${total} domains`
        : `${matched} of ${total}`
    return undefined
  }

  let held: DomainTreeState | null = null

  let owed = false

  const draw = (state: DomainTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      total = countNodes(state.roots)
      describe()
      view.badge = {
        value: total,
        tooltip: total === 1 ? "1 domain" : `${total} domains`,
      }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${total} domain(s) under ${state.roots.length} root(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} reached by no root: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          domains: total,
          roots: state.roots.length,
          reachedByNoRoot: state.unreached.length,
        },
      })
      if (state.unreached.length > 0) {
        void vscode.window.showWarningMessage(
          `Domains: ${state.unreached.length} domain(s) hang under no root and are not shown. ` +
            "See the Ops: Domain Tree output."
        )
      }
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: DomainTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState<DomainTreeState>(stateAt(akashaRoot(), SLUG))
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState<DomainTreeState>(akashaRoot(), SLUG, (state) =>
    show(state, "domains")
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
