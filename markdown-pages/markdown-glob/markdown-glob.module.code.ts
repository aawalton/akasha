import { type Dirent, readdirSync } from "node:fs"
import { onceInCall } from "@akasha/command-system/during-call"
import { Minimatch } from "minimatch"

const MATCHING = { dot: true } as const

const held = new Map<string, Minimatch>()

// `node_modules/akasha` is a symlink to the checkout root and the workspace links beside it point
// back into the tree, so a walk that follows them recurses until it dies with ELOOP — measured at
// 78s to the throw. `.git` holds no page. Entries are read with their type, so a symlink is neither
// a directory to descend nor a file to match, and nothing here follows one.
const UNWALKED: ReadonlySet<string> = new Set(["node_modules", ".git"])

// Everything before the last `/` that stands ahead of the first glob character. Walking from there
// rather than from the root is what keeps a placed pattern cheap.
const SPECIAL = /[*?[\]{}()!+@]/

export function globFor(pattern: string): Minimatch {
  const found = held.get(pattern)
  if (found !== undefined) return found
  const made = new Minimatch(pattern, MATCHING)
  held.set(pattern, made)
  return made
}

export function matchesGlob(relPath: string, pattern: string): boolean {
  return globFor(pattern).match(relPath)
}

export function globBaseOf(pattern: string): string {
  const found = SPECIAL.exec(pattern)
  const cut = pattern.lastIndexOf("/", found === null ? pattern.length : found.index)
  return cut < 0 ? "" : pattern.slice(0, cut)
}

// `**/*.md` reaches every file the walk turns up, and the walk turns up 117,270 of them to keep the
// 56,500 that end in `.md`. Asking minimatch that question 117,270 times costs around 200ms of a
// 260ms walk, because it splits each path on `/` and runs a pattern per segment. A pattern whose
// only glob characters are the leading `**/` and a `*` ahead of a literal tail asks nothing of the
// path but its ending, so the ending is what gets read.
//
// `**/` stands for zero or more segments and `*` for zero or more characters within one, so under
// `dot: true` the pattern matches exactly those paths ending in the tail, wherever they stand and
// whatever they are named — which is what `endsWith` answers.
const TAIL_ONLY = /^\*\*\/\*([A-Za-z0-9._-]+)$/

function tailOf(pattern: string): string | null {
  return TAIL_ONLY.exec(pattern)?.[1] ?? null
}

function scannedGlob(pattern: string, root: string): readonly string[] {
  const tail = tailOf(pattern)
  const matches = tail === null ? globFor(pattern) : { match: (at: string) => at.endsWith(tail) }
  const found: string[] = []
  const walk = (dir: string): void => {
    let entries: readonly Dirent[]
    try {
      entries = readdirSync(dir === "" ? root : `${root}/${dir}`, { withFileTypes: true })
    } catch {
      return
    }
    for (const one of entries) {
      const at = dir === "" ? one.name : `${dir}/${one.name}`
      if (one.isDirectory()) {
        if (!UNWALKED.has(one.name)) walk(at)
        continue
      }
      if (one.isFile() && matches.match(at)) found.push(at)
    }
  }
  walk(globBaseOf(pattern))
  return found
}

// ONE WALK OF A TREE PER CALL, AND NO MEMORY OF IT PAST THE CALL. `**/*.md` over this checkout is
// 56,538 files and 0.6s of `readdirSync`, and one read of the editor's page tree walked it 22
// times: six saved queries, each scanning for the query pages, for the pages of its type, and for
// the page-type registry under those. Held for the length of a `duringOneCall` scope the 22 walks
// are one, and the answer is the same answer — measured byte for byte against what the 22 walks
// composed. A reader outside such a scope memoizes nothing and walks the disk as it stands.
//
// What a call gets is therefore the tree as it stood when that call first asked. `page-type-files`
// and `documents` already hold a scan on those terms, so a writer landing a file and scanning
// again inside one call was reading past its own write before this.
export function scanGlob(pattern: string, root: string): readonly string[] {
  return onceInCall(`scan-glob:${root} ${pattern}`, () => scannedGlob(pattern, root))
}
