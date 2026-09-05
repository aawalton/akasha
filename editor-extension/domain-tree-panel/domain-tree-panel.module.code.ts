import { relative } from "node:path"
import * as vscode from "vscode"
import {
  followState,
  readState,
  stateAt,
} from "../../alan/harness/code-editor/code-editor-data-interfaces/state-reading/state-reading.module.code.ts"
import { countNodes, type DomainNode } from "../champions-tree/champions-tree.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../domain-tree-ids/domain-tree-ids.module.code.ts"
import type { DomainTree } from "../domain-tree-reading/domain-tree-reading.module.code.ts"
import { createDomainTree } from "../domain-tree-view/domain-tree-view.module.code.ts"
import { akashaRoot } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"

const FEATURE = "domain-tree"
const SLUG = "domain-tree"

// The file spells a row the way every state file spells one, and the panel spells it another way.
// The document is the one field that differs in kind rather than in name: the file carries the
// whole path, the panel carries it against the repository, and `documentPath` puts them back
// together. Taking the repository away from the path here is what makes that join exact.
function asNode(row: DomainTreeRow, root: string): DomainNode {
  return {
    slug: row.key,
    relPath: row.at === null ? "" : relative(root, row.at),
    persona: row.persona,
    position: row.position,
    children: row.children.map((child) => asNode(child, root)),
  }
}

let output: vscode.OutputChannel

export async function activate(context: vscode.ExtensionContext): Promise<undefined> {
  output = vscode.window.createOutputChannel("Ops: Domain Tree")
  context.subscriptions.push(output)

  const tree = createDomainTree()
  const view = vscode.window.createTreeView<DomainNode>(VIEW_ID, {
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
    const root = akashaRoot()
    try {
      const next: DomainTree = {
        repo: root,
        roots: state.roots.map((row) => asNode(row, root)),
        unreached: state.unreached,
      }
      tree.replace(next)
      total = countNodes(next.roots)
      describe()
      view.badge = {
        value: total,
        tooltip: total === 1 ? "1 domain" : `${total} domains`,
      }
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${total} domain(s) under ${next.roots.length} root(s)` +
          (next.unreached.length === 0
            ? ""
            : `; ${next.unreached.length} reached by no root: ${next.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          domains: total,
          roots: next.roots.length,
          reachedByNoRoot: next.unreached.length,
        },
      })
      if (next.unreached.length > 0) {
        void vscode.window.showWarningMessage(
          `Domains: ${next.unreached.length} domain(s) hang under no root and are not shown. ` +
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
