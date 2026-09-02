import { lstatSync } from "node:fs"
import { join } from "node:path"
import { said as gitIn, told as gitTold } from "@akasha/git/git-running"

export const AUTHOR = "Akasha <akasha@alanwalton.com>"

export const UNNAMED = "unnamed"

const FILE_MODE = "100644"

const EXEC_MODE = "100755"

const OWNER_RUNS = 0o100

const GONE_OID = "0000000000000000000000000000000000000000"

const TREE_MODE = "040000"

const TREE = "tree"

const BLOB = "blob"

type Entry = {
  readonly mode: string
  readonly kind: string
  readonly oid: string
  readonly name: string
}

type Node = {
  readonly files: Map<string, string | null>
  readonly dirs: Map<string, Node>
}

const bytesOf = (said: string): Uint8Array => new TextEncoder().encode(said)

function nameOf(root: string): string {
  return gitTold(root, ["rev-parse", "HEAD"])?.trim() ?? UNNAMED
}

function refOf(root: string): string {
  return gitTold(root, ["symbolic-ref", "HEAD"])?.trim() ?? "HEAD"
}

function entriesIn(said: string): readonly Entry[] {
  const held: Entry[] = []
  for (const line of said.split("\n")) {
    const cut = line.indexOf("\t")
    if (cut < 0) continue
    const meta = line.slice(0, cut).split(" ")
    const mode = meta[0]
    const kind = meta[1]
    const oid = meta[2]
    if (mode === undefined || kind === undefined || oid === undefined) continue
    held.push({ mode, kind, oid, name: line.slice(cut + 1) })
  }
  return held
}

function entriesOf(root: string, tree: string): readonly Entry[] {
  const said = gitTold(root, ["ls-tree", tree])
  return said === null ? [] : entriesIn(said)
}

function ordering(one: Entry, two: Entry): number {
  const a = one.kind === TREE ? `${one.name}/` : one.name
  const b = two.kind === TREE ? `${two.name}/` : two.name
  return a < b ? -1 : a > b ? 1 : 0
}

function madeFrom(root: string, every: readonly Entry[]): string {
  const body = [...every]
    .sort(ordering)
    .map((one) => `${one.mode} ${one.kind} ${one.oid}\t${one.name}\n`)
    .join("")
  return gitIn(root, ["mktree"], { stdin: bytesOf(body) }).trim()
}

function nodeOf(put: ReadonlyMap<string, string | null>): Node {
  const top: Node = { files: new Map(), dirs: new Map() }
  for (const [path, oid] of put) {
    const parts = path.split("/")
    let at = top
    for (const part of parts.slice(0, -1)) {
      const found = at.dirs.get(part)
      if (found !== undefined) {
        at = found
        continue
      }
      const made: Node = { files: new Map(), dirs: new Map() }
      at.dirs.set(part, made)
      at = made
    }
    const last = parts[parts.length - 1]
    if (last !== undefined) at.files.set(last, oid)
  }
  return top
}

function treeFrom(
  root: string,
  from: string | null,
  node: Node,
  modes: ReadonlyMap<string, string>,
  at: string
): string | null {
  const by = new Map<string, Entry>()
  for (const one of from === null ? [] : entriesOf(root, from)) by.set(one.name, one)
  for (const [name, sub] of node.dirs) {
    const there = by.get(name)
    const made = treeFrom(
      root,
      there !== undefined && there.kind === TREE ? there.oid : null,
      sub,
      modes,
      `${at}${name}/`
    )
    if (made === null) by.delete(name)
    else by.set(name, { mode: TREE_MODE, kind: TREE, oid: made, name })
  }
  for (const [name, oid] of node.files) {
    if (oid === null) {
      by.delete(name)
      continue
    }
    const there = by.get(name)
    const mode = modes.get(`${at}${name}`) ?? there?.mode ?? FILE_MODE
    by.set(name, { mode, kind: BLOB, oid, name })
  }
  const every = [...by.values()]
  return every.length === 0 ? null : madeFrom(root, every)
}

function modesIn(root: string, head: string, paths: readonly string[]): Map<string, string> {
  const held = new Map<string, string>()
  if (paths.length === 0) return held
  const said = gitTold(root, ["ls-tree", "-r", head, "--", ...paths])
  if (said === null) return held
  for (const one of entriesIn(said)) held.set(one.name, one.mode)
  return held
}

function modeOnDisk(root: string, path: string): string | null {
  let found: ReturnType<typeof lstatSync>
  try {
    found = lstatSync(join(root, path))
  } catch {
    return null
  }
  if (!found.isFile()) return null
  return (found.mode & OWNER_RUNS) === 0 ? FILE_MODE : EXEC_MODE
}

function modesFor(
  root: string,
  head: string,
  wrote: readonly string[],
  took: readonly string[]
): Map<string, string> {
  const held = modesIn(root, head, [...wrote, ...took])
  for (const one of wrote) {
    const found = modeOnDisk(root, one)
    if (found !== null) held.set(one, found)
  }
  return held
}

const INDEX_LOCK_CEILING_MS = 30_000

const INDEX_LOCK_FIRST_WAIT_MS = 100

const INDEX_LOCK_LONGEST_WAIT_MS = 2_000

function sleepFor(ms: number): undefined {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function heldIndex(thrown: unknown): boolean {
  const said = thrown instanceof Error ? thrown.message : String(thrown)
  return said.includes("index.lock") && said.includes("File exists")
}

export function whileIndexFrees<T>(run: () => T, ceilingMs = INDEX_LOCK_CEILING_MS): T {
  const until = Date.now() + ceilingMs
  let wait = INDEX_LOCK_FIRST_WAIT_MS
  for (;;) {
    try {
      return run()
    } catch (thrown) {
      const left = until - Date.now()
      if (!heldIndex(thrown) || left <= 0) throw thrown
      sleepFor(Math.min(wait, left))
      wait = Math.min(wait * 2, INDEX_LOCK_LONGEST_WAIT_MS)
    }
  }
}

function indexOnto(
  root: string,
  put: ReadonlyMap<string, string | null>,
  modes: ReadonlyMap<string, string>
): undefined {
  const lines: string[] = []
  for (const [path, oid] of put) {
    if (oid === null) lines.push(`0 ${GONE_OID}\t${path}`)
    else lines.push(`${modes.get(path) ?? FILE_MODE} ${oid}\t${path}`)
  }
  whileIndexFrees(() =>
    gitIn(root, ["update-index", "--index-info"], { stdin: bytesOf(`${lines.join("\n")}\n`) })
  )
}

const NAMED = /^\s*(.*?)\s*<([^>]*)>\s*$/

function identifying(writer: string): readonly string[] {
  const found = NAMED.exec(writer)
  if (found === null) return []
  const name = found[1]
  const email = found[2]
  if (name === undefined || name === "" || email === undefined || email === "") return []
  return ["-c", `user.name=${name}`, "-c", `user.email=${email}`]
}

function blobFor(root: string, path: string): string {
  return gitIn(root, ["hash-object", "-w", "--", path]).trim()
}

export function committed(
  root: string,
  wrote: readonly string[],
  took: readonly string[],
  message: string,
  writer: string | null
): string | null {
  const head = nameOf(root)
  if (head === UNNAMED) throw new Error("HEAD names no commit, so nothing lands onto it")
  const was = gitIn(root, ["rev-parse", `${head}^{tree}`]).trim()
  const modes = modesFor(root, head, wrote, took)
  const put = new Map<string, string | null>()
  for (const one of wrote) put.set(one, blobFor(root, one))
  for (const one of took) put.set(one, null)
  const tree = treeFrom(root, was, nodeOf(put), modes, "") ?? madeFrom(root, [])
  if (tree === was) return null
  const writing = writer ?? AUTHOR
  const made = gitIn(root, [
    ...identifying(writing),
    "commit-tree",
    tree,
    "-p",
    head,
    "-m",
    message,
  ]).trim()
  indexOnto(root, put, modes)
  gitIn(root, ["update-ref", refOf(root), made, head])
  return made
}
