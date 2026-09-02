import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs"
import { join, relative } from "node:path"
import { told } from "@akasha/git/git-running"
import { stringAt } from "@akasha/utils-narrow/string-at"

export type Stamp = {
  readonly commit: string
  readonly tree: string
  readonly settled: readonly string[]
}

const STAMP = "stamp.jsonl"

const COMMIT = /^[0-9a-f]{40,64}$/

const SHORT = 7

const SHOWN = 5

const HERE = "."

export function stampIn(at: string): Stamp | null {
  const file = join(at, STAMP)
  if (!existsSync(file)) return null
  const line = readFileSync(file, "utf8").split("\n")[0]
  if (line === undefined || line === "") return null
  let said: Record<string, unknown>
  try {
    said = JSON.parse(line) as Record<string, unknown>
  } catch {
    return null
  }
  const commit = stringAt(said, "commit")
  const tree = stringAt(said, "tree")
  const settled = said["settled"]
  if (commit === null || !COMMIT.test(commit)) return null
  if (tree === null || !Array.isArray(settled)) return null
  return { commit, tree, settled: settled.filter((one): one is string => typeof one === "string") }
}

export function stampKept(at: string, held: Stamp): undefined {
  mkdirSync(at, { recursive: true })
  const near = join(at, `${STAMP}.${process.pid}.part`)
  const said = { commit: held.commit, tree: held.tree, settled: [...new Set(held.settled)].sort() }
  writeFileSync(near, `${JSON.stringify(said)}\n`)
  renameSync(near, join(at, STAMP))
}

export function stampTaken(at: string): undefined {
  rmSync(join(at, STAMP), { force: true })
}

function pathsIn(said: string | null): readonly string[] | null {
  return said === null ? null : said.split("\0").filter((one) => one !== "")
}

export function headOf(repo: string): string | null {
  const said = told(repo, ["rev-parse", "HEAD"])
  return said === null ? null : said.trim()
}

export function changedSince(
  repo: string,
  commit: string,
  head: string,
  tree: string
): readonly string[] | null {
  return pathsIn(
    told(repo, ["diff", "--name-only", "--no-renames", "-z", commit, head, "--", tree])
  )
}

export function unlandedIn(repo: string, tree: string): readonly string[] {
  const changed = pathsIn(
    told(repo, ["diff", "--name-only", "--no-renames", "-z", "HEAD", "--", tree])
  )
  const untracked = pathsIn(
    told(repo, ["ls-files", "--others", "--exclude-standard", "-z", "--", tree])
  )
  return [...new Set([...(changed ?? []), ...(untracked ?? [])])].sort()
}

function shortly(commit: string): string {
  return commit.slice(0, SHORT)
}

// What two commits differ in never itself changes, so the answer is kept for the life of the
// process, keyed by the repository and the two commits and the tree. HEAD is deliberately not
// kept this way: agents commit into a shared worktree every few seconds, and a service or an
// editor host outlives many of those commits, so `headOf` asks git afresh every time or the
// guard would answer from a commit that has already moved.
const KEEPING = 256

const changedKept = new Map<string, readonly string[]>()

function changedFor(repo: string, held: Stamp, head: string): readonly string[] | null {
  if (head === held.commit) return []
  const key = `${repo}\0${held.commit}\0${head}\0${held.tree}`
  const kept = changedKept.get(key)
  if (kept !== undefined) return kept
  const found = changedSince(repo, held.commit, head, held.tree)
  if (found === null) return null
  if (changedKept.size >= KEEPING) changedKept.clear()
  changedKept.set(key, found)
  return found
}

function looseIn(held: Stamp, changed: readonly string[]): readonly string[] {
  const settled = new Set(held.settled)
  return changed.filter((one) => !settled.has(one))
}

export function staleFor(repo: string, at: string): string | null {
  const held = stampIn(at)
  if (held === null) return "the index names no commit it was built from"
  const head = headOf(repo)
  if (head === null) return `no commit could be read from \`${repo}\``
  const changed = changedFor(repo, held, head)
  if (changed === null) {
    return `the index was built from \`${shortly(held.commit)}\`, which this repository does not hold`
  }
  const loose = looseIn(held, changed)
  if (loose.length === 0) return null
  const named = loose.slice(0, SHOWN).join(", ")
  const more = loose.length > SHOWN ? `, and ${loose.length - SHOWN} more` : ""
  return `the index was built from \`${shortly(held.commit)}\` and HEAD is \`${shortly(head)}\`, which differ in ${loose.length} path(s) it was never settled over — ${named}${more}`
}

function treeOf(repo: string, tree: string): string {
  const under = relative(repo, tree)
  return under === "" ? HERE : under
}

export function stampBuilt(repo: string, tree: string, at: string): undefined {
  const head = headOf(repo)
  if (head === null) return
  const under = treeOf(repo, tree)
  stampKept(at, { commit: head, tree: under, settled: unlandedIn(repo, under) })
}

export function stampSettled(repo: string, at: string, paths: readonly string[]): undefined {
  const held = stampIn(at)
  if (held === null) return
  const head = headOf(repo)
  const changed = head === null ? null : changedFor(repo, held, head)
  if (head === null || changed === null || looseIn(held, changed).length > 0) {
    stampKept(at, { ...held, settled: [...held.settled, ...paths] })
    return
  }
  const landed = new Set(changed)
  stampKept(at, {
    commit: head,
    tree: held.tree,
    settled: [...held.settled.filter((one) => !landed.has(one)), ...paths],
  })
}
