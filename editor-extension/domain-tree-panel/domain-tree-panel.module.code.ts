import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { countNodes } from "../champions-tree/champions-tree.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../domain-tree-ids/domain-tree-ids.module.code.ts"
import { createDomainTree } from "../domain-tree-view/domain-tree-view.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"

const FEATURE = "domain-tree"
const SLUG = "domain-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Domain Tree")
  context.subscriptions.push(output)

  // THE FILE'S OWN ROW IS WHAT IS DRAWN. The row already names its document by a whole path, so
  // there is nothing between the file and the view to spell it a second way.
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

  // What the file last said, drawn or waiting to be drawn.
  let held: DomainTreeState | null = null

  // The file moved while nobody was looking at the panel. Nothing was drawn for it, and the
  // drawing is owed until the panel is looked at again.
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

  // NOTHING IS DRAWN FOR A PANEL NOBODY IS LOOKING AT. The Domains view shares the secondary
  // sidebar with Agents, Work and Pages, so it is hidden most of the time, and rebuilding ten
  // thousand rows for a hidden view spends the extension host's thread on nothing Alan can see.
  // The state is kept all the same, so becoming visible draws what the file says now.
  const show = (state: DomainTreeState, trigger: string): undefined => {
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
