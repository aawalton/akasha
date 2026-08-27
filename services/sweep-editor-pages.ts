export const tool = {
  summary: "Delete every editor page whose window or terminal is gone",
  repos: ["akasha"],
} as const

import {
  GROUP,
  namesOf,
  type Named,
  TAB,
  TERMINAL,
  WINDOW,
  WRITER,
} from "../tools/lib/editor-arrangement.ts"
import { type FileTree } from "../page/file-tree.ts"
import { diskFileTree } from "../page/file-tree.ts"
import { registryOf } from "../page/property/registry.ts"
import { removePage, whereFor } from "../tools/lib/page-write.ts"
import { type Roots } from "../page/page"
import { resolveRoots } from "../repo/roots/roots"
import { frontmatterOf } from "../tools/lib/seat-presence-read.ts"
import { type SeatPresence, statedProcessPresence } from "../tools/lib/seat-proc-key.ts"

const HELP = `bun services/sweep-editor-pages.ts — delete every editor page whose window or terminal is gone

pages/page-type/code-editor-window.page-type.md says a closed window takes its page and its groups with it,
and pages/page-type/code-editor-terminal.page-type.md says a closed terminal has no page. This is what takes
them away when the window was killed rather than closed, so nothing reached the writer.

WHERE A PAGE STANDS IS ASKED, NEVER SPELLED. A page type's pages stand at \`pages/<slug>/\`, and
both this and the writer resolve every path from the page type's slug, so a page type that is
renamed carries its sweep with it. This file named four folders once; the pages moved and the
names did not, and a live window went unswept while a dead one stood where nothing looked for it.

LIVENESS IS READ, NEVER TIMED. A window and a terminal each state a process, which is a pid
paired with the start time the kernel fixed at exec, so a recycled pid reads as gone rather
than as the window that used to hold it.

GONE AND UNREADABLE ARE DIFFERENT ANSWERS. A page is taken only where its process is proven
gone, which is /proc answering that no such pid stands. A page stating no process, one whose
process cannot be parsed, and one whose /proc entry could not be read are each a reading that
did not happen, and this refuses to take a page on one of those: they are named as uncertain
and left standing, and a run that met one exits non-zero. An unreadable window keeps its groups
and its tabs standing with it.

A GROUP OR A TAB NAMES ITS WINDOW IN ITS OWN NAME, which is what lets this take them without
opening them: a process holds no dash, so everything before the first one is the window.

NOTHING IS REMOVED WITHOUT --remove. The sweep reports by default, because what it takes away
is a commit in another repository and seeing the list first costs one run.

Usage:
  bun ~/repos/akasha/services/sweep-editor-pages.ts [--remove]

  --remove  Take the pages away, through the gated removal, one page type at a time.
  --help    This.
`

function processPresence(
  roots: Roots,
  pageType: string,
  name: string,
  tree: FileTree
): SeatPresence {
  const at = whereFor(roots, pageType, name, tree)
  if (at === null) return "unknown"
  return statedProcessPresence(frontmatterOf(at.path)?.["process"])
}

export interface EditorPageSweep {
  readonly gone: readonly Named[]
  readonly uncertain: readonly Named[]
}

export function windowOf(name: string, live: ReadonlySet<string>): string | null {
  let found: string | null = null
  for (const one of live) {
    if (name !== one && !name.startsWith(`${one}-`)) continue
    if (found === null || one.length > found.length) found = one
  }
  return found
}

export function sweepIn(roots: Roots): EditorPageSweep {
  const tree = diskFileTree(roots)
  const types = registryOf(tree)
  const gone: Named[] = []
  const uncertain: Named[] = []
  const live = new Set<string>()
  for (const name of namesOf(roots, types, WINDOW)) {
    const presence = processPresence(roots, WINDOW, name, tree)
    if (presence === "absent") {
      gone.push({ pageType: WINDOW, name })
      continue
    }
    live.add(name)
    if (presence === "unknown") uncertain.push({ pageType: WINDOW, name })
  }
  for (const pageType of [GROUP, TAB]) {
    for (const name of namesOf(roots, types, pageType)) {
      if (windowOf(name, live) === null) gone.push({ pageType, name })
    }
  }
  for (const name of namesOf(roots, types, TERMINAL)) {
    const presence = processPresence(roots, TERMINAL, name, tree)
    if (presence === "absent") gone.push({ pageType: TERMINAL, name })
    else if (presence === "unknown") uncertain.push({ pageType: TERMINAL, name })
  }
  return { gone, uncertain }
}

export function goneIn(roots: Roots): readonly Named[] {
  return sweepIn(roots).gone
}

function remove(roots: Roots, gone: readonly Named[]): readonly string[] {
  const refusals: string[] = []
  for (const one of gone) {
    const taken = removePage(roots, one.pageType, one.name, WRITER)
    if (taken === null) refusals.push(`${one.pageType}/${one.name}: no page type this removes`)
    else if (taken.refused !== undefined) refusals.push(`${one.pageType}/${one.name}: ${taken.refused}`)
    else if (taken.commitError !== null) refusals.push(`${one.pageType}/${one.name}: ${taken.commitError}`)
  }
  return refusals
}

if (import.meta.main) {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(HELP)
    process.exit(0)
  }
  const roots = resolveRoots()
  const { gone, uncertain } = sweepIn(roots)
  for (const one of gone) console.log(`${one.pageType}/${one.name}`)
  for (const one of uncertain) console.error(`uncertain\t${one.pageType}/${one.name}`)
  const said = `${gone.length} page(s) whose window or terminal is gone, ${uncertain.length} whose process could not be read and are left standing`
  if (gone.length === 0 || !process.argv.includes("--remove")) {
    console.log(said)
    process.exit(uncertain.length === 0 ? 0 : 1)
  }
  const refusals = remove(roots, gone)
  if (refusals.length > 0) {
    console.error(refusals.join("\n"))
    process.exit(1)
  }
  console.log(`${gone.length} page(s) taken, ${uncertain.length} left standing as unreadable`)
  process.exit(uncertain.length === 0 ? 0 : 1)
}
