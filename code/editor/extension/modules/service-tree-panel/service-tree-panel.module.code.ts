import {
  followState,
  readState,
  stateAt,
} from "akasha/alan/harness/code-editor/data-interface/modules/state-reading/state-reading.module.code.ts"
import {
  type ServiceTreeRow,
  type ServiceTreeState,
  serviceTreeStateSchema,
} from "akasha/alan/harness/code-editor/data-interface/pages/service-tree/service-tree.code-editor-data-interface.code.ts"
import { akashaRoot } from "akasha/code/editor/extension/modules/harness-call/harness-call.module.code.ts"
import { recordObservation } from "akasha/code/editor/extension/modules/observation-store/observation-store.module.code.ts"
import {
  REFRESH_COMMAND,
  VIEW_ID,
} from "akasha/code/editor/extension/modules/service-tree-ids/service-tree-ids.module.code.ts"
import {
  countOfKind,
  countRows,
} from "akasha/code/editor/extension/modules/service-tree-reading/service-tree-reading.module.code.ts"
import {
  createServiceDecorationProvider,
  createServiceTree,
} from "akasha/code/editor/extension/modules/service-tree-view/service-tree-view.module.code.ts"
import * as vscode from "vscode"

const FEATURE = "service-tree"
const SLUG = "service-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Service Tree")
  context.subscriptions.push(output)

  const tree = createServiceTree(akashaRoot())
  const view = vscode.window.createTreeView<ServiceTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the services…"
  context.subscriptions.push(tree, view)

  let known = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    if (matched !== undefined) {
      view.description = `${matched} matched`
      return undefined
    }
    view.description = known === 1 ? "1 service" : `${known} services`
    return undefined
  }

  let held: ServiceTreeState | null = null

  let owed = false

  const drawing = (state: ServiceTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      const rows = countRows(state.roots)
      const services = countOfKind(state.roots, "service")
      const kinds = countOfKind(state.roots, "kind")
      known = services
      describe()
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${rows} row(s), ${services} of them services, under ${kinds} kind(s)`
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: { rows, services, kinds },
      })
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: ServiceTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return drawing(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState(stateAt(akashaRoot(), SLUG), serviceTreeStateSchema)
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState(akashaRoot(), SLUG, serviceTreeStateSchema, (state) =>
    show(state, "services")
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
      drawing(held, "shown")
    }),
    view.onDidChangeFilterValue((pattern) => {
      tree.filter(pattern)
      describe()
    }),
    vscode.window.registerFileDecorationProvider(createServiceDecorationProvider()),
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )
  return undefined
}
