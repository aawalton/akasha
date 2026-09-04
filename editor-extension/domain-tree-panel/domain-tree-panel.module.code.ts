import { createHash } from "node:crypto"
import * as path from "node:path"
import * as vscode from "vscode"
import { countNodes, type DomainNode } from "../champions-tree/champions-tree.module.code.ts"
import { REFRESH_COMMAND, VIEW_ID } from "../domain-tree-ids/domain-tree-ids.module.code.ts"
import {
  askDomainTree,
  domainTreeIn,
} from "../domain-tree-reading/domain-tree-reading.module.code.ts"
import { createDomainTree } from "../domain-tree-view/domain-tree-view.module.code.ts"
import { repositoryPath, unreachableMessage } from "../harness-call/harness-call.module.code.ts"
import { recordObservation } from "../observation-store/observation-store.module.code.ts"
import { createSettledRefresh } from "../settled-refresh/settled-refresh.module.code.ts"

const FEATURE = "domain-tree"

// How long the corpus has to hold still before the tree is read again, when the last read said
// something new. This is the quiet Alan's own edit waits through, so it stays short.
const SETTLE_MS = 2_000

// THE LONGEST A WRITE MAY WAIT TO BE ANSWERED, and the ceiling the demanded quiet backs off to.
// Measured over 420s of this worktree at load 30-51, `akasha/**/*.ts` took 295 distinct mtimes —
// 42 writes a minute — of which 66 gaps ran past the 2000ms settle, so the panel read 9.6 times a
// minute. Almost none of that is Alan: 234 of those 318 writes were `.uncommitted.ts` sidecars of
// other agents, and 11 could have moved a row at all.
//
// A quiet that only grows is a trap at that write rate. Backing off to 16s while writes keep
// arriving every 1.4s pushes the timer out ahead of itself and it never fires at all: replayed
// against this trace, a plain backoff read 3 times in 7 minutes and left a real change unshown
// for 257s. So this is a deadline as well as a ceiling. `quiet()` returns whichever is sooner,
// the quiet asked for or what is left of this window, which makes the wait a change can suffer
// bounded by the constant rather than by how busy the other agents happen to be.
const ANSWER_WITHIN_MS = 16_000

// A new page type extending `domain` is the one edit that can add a row of a kind this has never
// seen, so it is worth naming beside the kinds that are drawn.
const PAGE_TYPE_SUFFIX = ".page-type.ts"

const CORPUS_GLOB = "**/*.ts"

let output: vscode.OutputChannel

// WHAT THE DRAWN ANSWER SAYS A PAGE OF ITS OWN KIND LOOKS LIKE. A domain page is named
// `<slug>.<page-type>.ts`, so the endings the drawn rows carry are the kinds under `domain` as
// they now are — 67 of them here, `.module.ts` and `.command.ts` and the rest. Reading them off
// the answer rather than writing them down is what keeps a kind added tomorrow from being a kind
// this panel is blind to.
function kindsIn(
  nodes: readonly DomainNode[],
  paths: Set<string>,
  endings: Set<string>
): undefined {
  for (const node of nodes) {
    paths.add(node.relPath)
    const name = node.relPath.slice(node.relPath.lastIndexOf("/") + 1)
    const dot = name.indexOf(".")
    if (dot > 0) {
      endings.add(name.slice(dot))
    }
    kindsIn(node.children, paths, endings)
  }
  return undefined
}

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

  // The bytes of the answer already drawn. The harness composes the tree from the files as they
  // now are and prints it; nothing in it is a clock or a counter, so two reads of an unmoved
  // corpus are byte-for-byte equal, and a hash of them soundly represents "would this redraw show
  // Alan anything he is not already looking at".
  let drawnHash: string | undefined

  // The rows now drawn, by path and by the ending their kind gives them, so a write can be told
  // from one that lands on a row or adds a row of a kind already drawn.
  let drawnPaths = new Set<string>()
  let drawnEndings = new Set<string>([PAGE_TYPE_SUFFIX])

  let settleMs = SETTLE_MS

  // When the oldest write not yet answered by a read arrived, which is what `ANSWER_WITHIN_MS`
  // is counted from.
  let owedSince: number | undefined

  // A write arrived while the panel was hidden. Nothing was read for it; the read is owed until
  // the panel is looked at again.
  let owed = false

  // A READ THAT SAYS THE SAME THING REDRAWS NOTHING AND RECORDS NOTHING. What made this panel
  // expensive was not the read — that is a bun child, off this thread — but everything the
  // answer set off once it arrived: `JSON.parse` of 1.26MB, 7,000-odd nodes rebuilt, the
  // tree-data event that has the editor re-ask for every visible row, and `recordObservation`,
  // whose write is the thing that blocks this host. Hashing the bytes first buys all of that
  // back for the reads — the large majority of them — that carry no news.
  //
  // The observation store already drops a patch whose `changeKey` is unchanged, so suppressing
  // the call here lands exactly what landed before; what it saves is the two whole-record
  // `JSON.stringify` calls that decision costs, on every one of those reads. `at` never advanced
  // for an unchanged observation either, so nothing downstream loses a heartbeat it had.
  const refresh = async (trigger: string): Promise<undefined> => {
    owedSince = undefined
    try {
      const said = await askDomainTree()
      const hash = createHash("sha1").update(said).digest("hex")
      if (hash === drawnHash) {
        settleMs = Math.min(settleMs * 2, ANSWER_WITHIN_MS)
        output.appendLine(
          `[${trigger}] the answer is the one already drawn, byte for byte; ` +
            `nothing redrawn, next quiet ${settleMs}ms`
        )
        return undefined
      }
      const next = domainTreeIn(said)
      drawnHash = hash
      settleMs = SETTLE_MS
      const paths = new Set<string>()
      const endings = new Set<string>([PAGE_TYPE_SUFFIX])
      kindsIn(next.roots, paths, endings)
      drawnPaths = paths
      drawnEndings = endings
      tree.replace(next)
      watchCorpus(next.repo)
      total = countNodes(next.roots)
      describe()
      view.badge = {
        value: total,
        tooltip: total === 1 ? "1 domain" : `${total} domains`,
      }
      const count = total
      view.message = undefined
      output.appendLine(
        `[${trigger}] ${count} domain(s) under ${next.roots.length} root(s) from ${next.repo}` +
          (next.unreached.length === 0
            ? ""
            : `; ${next.unreached.length} reached by no root: ${next.unreached.join(", ")}`)
      )
      recordObservation(FEATURE, {
        outcome: "ok",
        counts: {
          domains: count,
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
      // A failed read leaves no drawn answer to compare against, so the next one that succeeds
      // redraws whatever it says rather than being mistaken for the one on screen.
      drawnHash = undefined
      settleMs = SETTLE_MS
      view.message = unreachableMessage(err)
      output.appendLine(`[${trigger}] read failed: ${String(err)}`)
      recordObservation(FEATURE, { outcome: "failed", failure: String(err) })
    }
    return undefined
  }

  // THE QUIET ASKED FOR, OR WHAT IS LEFT OF THE WINDOW, WHICHEVER IS SOONER. `request` arms its
  // timer from now with whatever this says, so returning the remainder of the window is what
  // turns a debounce that churn can push out for ever into one that fires on the deadline.
  const quiet = (): number => {
    const now = Date.now()
    if (owedSince === undefined) {
      owedSince = now
    }
    return Math.max(0, Math.min(settleMs, owedSince + ANSWER_WITHIN_MS - now))
  }

  const settled = createSettledRefresh(quiet, refresh)

  // A WRITE THAT COULD MOVE A ROW PUTS THE QUIET BACK TO `SETTLE_MS`. A domain page is named
  // `<slug>.<page-type>.ts`, so a write is worth hurrying for when it lands on a row already
  // drawn, when it carries the ending of a kind already drawn — which is how a page added to an
  // existing kind is caught before it is a row — or when it is a page type, which is how a kind
  // nobody has drawn yet is caught.
  //
  // This is a hint and never a filter: every write still asks for a read, and the deadline still
  // holds over all of them, so a path this fails to recognise costs it the short quiet and not
  // the row. In the 420s trace it fires on 11 writes of 318.
  const couldMoveARow = (repo: string, fsPath: string): boolean => {
    if (drawnPaths.has(path.relative(repo, fsPath))) {
      return true
    }
    const name = fsPath.slice(fsPath.lastIndexOf("/") + 1)
    const dot = name.indexOf(".")
    return dot > 0 && drawnEndings.has(name.slice(dot))
  }

  // NOTHING IS READ FOR A PANEL NOBODY IS LOOKING AT. The Domains view shares the secondary
  // sidebar with Agents, Work and Pages, so it is hidden most of the time, and a hidden view
  // redraws nothing whatever it is told. The read is not dropped, it is owed: becoming visible
  // pays it at once, with no settle at all, so what Alan sees when he opens the panel is what
  // the files say and not what they said when he last closed it.
  const moved =
    (why: string) =>
    (uri: vscode.Uri): void => {
      if (!view.visible) {
        owed = true
        return
      }
      if (watched !== undefined && couldMoveARow(watched, uri.fsPath)) {
        settleMs = SETTLE_MS
      }
      settled.request(why)
    }

  let watched: string | undefined
  const watchCorpus = (named: string): undefined => {
    if (watched !== undefined) {
      return undefined
    }
    const repo = repositoryPath(named)
    watched = repo
    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(vscode.Uri.file(repo), CORPUS_GLOB)
    )
    context.subscriptions.push(
      watcher,
      watcher.onDidChange(moved("written")),
      watcher.onDidCreate(moved("added")),
      watcher.onDidDelete(moved("removed"))
    )
    output.appendLine(
      `watching ${repo}/${CORPUS_GLOB}, re-reading ${SETTLE_MS}ms after it settles, ` +
        "backing off while the answer does not move, and never later than " +
        `${ANSWER_WITHIN_MS}ms after a write`
    )
    return undefined
  }

  context.subscriptions.push(
    settled,
    view.onDidChangeVisibility((event) => {
      if (!event.visible || !owed) {
        return
      }
      owed = false
      void refresh("shown")
    }),
    view.onDidChangeFilterValue((pattern) => {
      tree.filter(pattern)
      describe()
    }),
    vscode.commands.registerCommand(REFRESH_COMMAND, () => refresh("manual"))
  )

  await refresh("activate")
  return undefined
}
