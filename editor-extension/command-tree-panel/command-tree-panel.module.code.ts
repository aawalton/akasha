import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../command-tree-ids/command-tree-ids.module.code.ts"
import {
  countCommands,
  countRows,
} from "../command-tree-reading/command-tree-reading.module.code.ts"
import { createCommandTree } from "../command-tree-view/command-tree-view.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"

const FEATURE = "command-tree"
const SLUG = "command-tree"

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Command Tree")
  context.subscriptions.push(output)

  const tree = createCommandTree()
  const view = vscode.window.createTreeView<CommandTreeRow>(VIEW_ID, {
    treeDataProvider: tree.provider,
    showCollapseAll: true,
    showExpandAll: true,
    showFilter: true,
  })
  view.message = "Reading the commands…"
  context.subscriptions.push(tree, view)

  let known = 0

  const describe = (): undefined => {
    const matched = tree.matchCount()
    if (matched !== undefined) {
      view.description = `${matched} matched`
      return undefined
    }
    view.description = known === 1 ? "1 command" : `${known} commands`
    return undefined
  }

  let held: CommandTreeState | null = null

  let owed = false

  const draw = (state: CommandTreeState, trigger: string): undefined => {
    try {
      tree.replace(state.roots)
      const rows = countRows(state.roots)
      const commands = countCommands(state.roots)
      known = commands
      describe()
      view.badge = { value: rows, tooltip: rows === 1 ? "1 row" : `${rows} rows` }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${rows} row(s), ${commands} of them commands, ` +
          `under ${state.roots.length} root(s)` +
          (state.unreached.length === 0
            ? ""
            : `; ${state.unreached.length} under no namespace: ${state.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          rows,
          commands,
          roots: state.roots.length,
          underNoNamespace: state.unreached.length,
        },
      })
      if (state.unreached.length > 0) {
        void vscode.window.showWarningMessage(
          `Commands: ${state.unreached.length} command(s) hang under no namespace. ` +
            "See the Ops: Command Tree output."
        )
      }
    } catch (err) {
      output.appendLine(`[${trigger}] drawing failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  const show = (state: CommandTreeState, trigger: string): undefined => {
    held = state
    if (!view.visible) {
      owed = true
      return undefined
    }
    owed = false
    return draw(state, trigger)
  }

  const refresh = (trigger: string): undefined => {
    const state = readState<CommandTreeState>(stateAt(akashaRoot(), SLUG))
    if (state === null) {
      return undefined
    }
    return show(state, trigger)
  }

  const reading = followState<CommandTreeState>(akashaRoot(), SLUG, (state) =>
    show(state, "commands")
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
