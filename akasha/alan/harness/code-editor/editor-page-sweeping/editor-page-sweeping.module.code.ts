import { diskFileTree, type FileTree } from "@akasha/markdown-pages/file-tree"
import { removePage } from "@akasha/markdown-pages/page-write"
import { whereFor } from "@akasha/markdown-pages/page-write-where"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { resolveRoots } from "@akasha/pages-system/checkout-roots"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { frontmatterOf } from "@akasha/seat-system/seat-presence-read"
import { type SeatPresence, statedProcessPresence } from "@akasha/seat-system/seat-proc-key"
import {
  GROUP,
  type Named,
  namesOf,
  TAB,
  TERMINAL,
  WINDOW,
  WRITER,
} from "@tools/lib/editor-arrangement"

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
    else if (taken.refused !== undefined)
      refusals.push(`${one.pageType}/${one.name}: ${taken.refused}`)
    else if (taken.commitError !== null)
      refusals.push(`${one.pageType}/${one.name}: ${taken.commitError}`)
  }
  return refusals
}

if (import.meta.main) {
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
