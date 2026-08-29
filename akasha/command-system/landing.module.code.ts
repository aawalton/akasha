import { execFileSync } from "node:child_process"
import {
  closeSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  readSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import type { Judged, Judging, Leaving } from "../checks-system/judging.module.code.ts"
import { indexIn } from "../pages-system/index/index-reading.module.code.ts"
import type { Indexing } from "../pages-system/index/indexing.module.code.ts"
import { holding } from "./holding.module.code.ts"

export { holding }

export type Change = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Proposed = {
  readonly base: string
  readonly changed: readonly Change[]
}

export type Landed = {
  readonly base: string
  readonly commit: string | null
  readonly wrote: readonly string[]
  readonly took: readonly string[]
  readonly noted: readonly string[]
}

export type Refused = {
  readonly refusals: readonly string[]
}

export const UNNAMED = "unnamed"

const CHECKING = "../checks-system/checking.module.code.ts"

export const CHECKING_AT = "akasha/checks-system/checking.module.code.ts"

const INDEXING = "../pages-system/index/indexing.module.code.ts"

export const INDEXING_AT = "akasha/pages-system/index/indexing.module.code.ts"

const PATCH = "patch"

const SAID_AT_MOST = 240

const CAT_FILE = "akasha-cat-file-"

const SAYING = "saying"

const TROUBLE = "trouble"

const COMMIT = "^{commit}"

const MISSING = " missing"

const RECORD = /^[0-9a-f]{40,64} [a-z]+ [0-9]+$/

const NEWLINE = 10

const HELD_AT_FIRST = 65536

const SPUN_BEFORE_WAITING = 20000

const SPUN_AT_MOST = 60000

const WAITED_FOR_A_BODY = 1

const READ_AT_MOST = 64 * 1024 * 1024

const reach_ = createRequire(import.meta.url)

export const NO_GATE: Judging = { named: [], over: () => [] }

export type Built = { readonly gate: Judging } | { readonly broken: string }

type Checking = {
  readonly checksIn: (root: string) => readonly unknown[]
  readonly checksAt: (every: readonly unknown[], phase: string) => readonly unknown[]
  readonly judgingBy: (every: readonly unknown[]) => Judging
}

export function oneLine(said: string): string {
  const held = said.replace(/\s+/g, " ").trim()
  return held.length <= SAID_AT_MOST ? held : `${held.slice(0, SAID_AT_MOST - 3)}...`
}

function checkingLoaded(): Checking {
  const held = reach_(CHECKING) as Partial<Checking>
  const named = [held.checksIn, held.checksAt, held.judgingBy]
  if (named.some((one) => typeof one !== "function")) {
    throw new Error("it answers to no `checksIn`, `checksAt` and `judgingBy` a gate is built from")
  }
  return held as Checking
}

type Keeping = (root: string, repo: string) => Indexing

function indexingLoaded(): Keeping {
  const held = reach_(INDEXING) as { readonly indexingAt?: unknown }
  if (typeof held.indexingAt !== "function") {
    throw new Error(`${INDEXING_AT} answers to no \`indexingAt\` the index is kept by`)
  }
  return held.indexingAt as Keeping
}

export function gateBuilt(root: string): Built {
  try {
    const held = checkingLoaded()
    return { gate: held.judgingBy(held.checksAt(held.checksIn(root), PATCH)) }
  } catch (thrown) {
    return { broken: oneLine(thrown instanceof Error ? thrown.message : String(thrown)) }
  }
}

function gitIn(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  })
}

export function baseOf(root: string): string {
  return gitIn(root, ["rev-parse", "HEAD"]).trim()
}

type Reading = {
  readonly root: string
  readonly dir: string
  readonly troubleAt: string
  readonly rfd: number
  readonly bases: Set<string>
  readonly asked: (name: string) => void
  readonly ended: () => void
  held: Buffer
  from: number
  to: number
  took: number
}

let reading: Reading | null = null

let sweeping = false

export function readingEnded(): void {
  const held = reading
  reading = null
  if (held === null) return
  held.ended()
  rmSync(held.dir, { recursive: true, force: true })
}

function readerOn(root: string): Reading {
  const dir = mkdtempSync(join(tmpdir(), CAT_FILE))
  const sayingAt = join(dir, SAYING)
  const troubleAt = join(dir, TROUBLE)
  const saying = openSync(sayingAt, "w")
  const trouble = openSync(troubleAt, "w")
  const kid = Bun.spawn(["git", "-C", root, "cat-file", "--batch", "-z"], {
    stdin: "pipe",
    stdout: saying,
    stderr: trouble,
  })
  kid.unref()
  const rfd = openSync(sayingAt, "r")
  return {
    root,
    dir,
    troubleAt,
    rfd,
    bases: new Set<string>(),
    held: Buffer.alloc(HELD_AT_FIRST),
    from: 0,
    to: 0,
    took: 0,
    asked: (name) => {
      kid.stdin.write(`${name}\0`)
      kid.stdin.flush()
    },
    ended: () => {
      try {
        kid.stdin.end()
      } catch {}
      for (const one of [rfd, saying, trouble]) {
        try {
          closeSync(one)
        } catch {}
      }
      kid.kill()
    },
  }
}

function readingIn(root: string): Reading {
  if (reading !== null && reading.root === root && reading.took < READ_AT_MOST) return reading
  readingEnded()
  if (!sweeping) {
    sweeping = true
    process.on("exit", readingEnded)
  }
  reading = readerOn(root)
  return reading
}

function troubledBy(held: Reading, said: string): Error {
  let why = ""
  try {
    why = readFileSync(held.troubleAt, "utf8").trim()
  } catch {}
  const also = why === "" ? "" : ` and said \`${oneLine(why)}\``
  return new Error(`\`git cat-file --batch\` over ${held.root} ${said}${also}`)
}

function filled(held: Reading): void {
  if (held.to === held.held.length) {
    if (held.from > 0) {
      held.held.copyWithin(0, held.from, held.to)
      held.to -= held.from
      held.from = 0
    } else {
      const grown = Buffer.alloc(held.held.length * 2)
      held.held.copy(grown)
      held.held = grown
    }
  }
  for (let spun = 0; spun < SPUN_AT_MOST; spun++) {
    const read = readSync(held.rfd, held.held, held.to, held.held.length - held.to, held.took)
    if (read > 0) {
      held.to += read
      held.took += read
      return
    }
    if (spun < SPUN_BEFORE_WAITING) continue
    if (statSync(held.troubleAt).size > 0) throw troubledBy(held, "answered nothing")
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, WAITED_FOR_A_BODY)
  }
  throw troubledBy(held, "answered nothing in time")
}

function lineOf(held: Reading): string {
  for (;;) {
    const end = held.held.indexOf(NEWLINE, held.from)
    if (end >= 0 && end < held.to) {
      const said = held.held.toString("utf8", held.from, end)
      held.from = end + 1
      return said
    }
    filled(held)
  }
}

function bytesOf(held: Reading, want: number): Uint8Array {
  while (held.to - held.from < want) filled(held)
  const said = new Uint8Array(held.held.subarray(held.from, held.from + want))
  held.from += want
  return said
}

function recordOf(held: Reading, name: string): Uint8Array | null {
  held.asked(name)
  const head = lineOf(held)
  if (!RECORD.test(head)) {
    if (head.endsWith(MISSING)) return null
    throw troubledBy(held, `answered \`${oneLine(head)}\``)
  }
  const said = bytesOf(held, Number(head.slice(head.lastIndexOf(" ") + 1)))
  bytesOf(held, 1)
  return said
}

export function bodyAt(root: string, base: string, path: string): Uint8Array | null {
  const held = readingIn(root)
  try {
    if (!held.bases.has(base)) {
      if (recordOf(held, `${base}${COMMIT}`) === null) {
        throw new Error(
          `\`${base}\` names no commit in ${root}, so no body could be read against it`
        )
      }
      held.bases.add(base)
    }
    return recordOf(held, `${base}:${path}`)
  } catch (thrown) {
    readingEnded()
    throw thrown
  }
}

export function leavingOf(root: string, proposed: Proposed): Leaving {
  const held = new Map<string, Uint8Array | null>()
  for (const one of proposed.changed) held.set(one.path, one.body)
  const read = new Map<string, Uint8Array | null>()
  const based = (path: string): Uint8Array | null => {
    const found = read.get(path)
    if (found !== undefined) return found
    if (read.has(path)) return null
    const body = bodyAt(root, proposed.base, path)
    read.set(path, body)
    return body
  }
  return {
    root,
    changed: proposed.changed.map((one) => one.path).sort(),
    at: (path) => {
      const said = held.get(path)
      if (said !== undefined) return said
      if (held.has(path)) return null
      return based(path)
    },
    was: based,
  }
}

function judged(judging: Judging, leaving: Leaving): readonly Judged[] {
  try {
    return judging.over(leaving)
  } finally {
    readingEnded()
  }
}

function wroteOnto(
  root: string,
  changed: readonly Change[]
): {
  readonly wrote: readonly string[]
  readonly took: readonly string[]
} {
  const wrote: string[] = []
  const took: string[] = []
  for (const one of changed) {
    const at = join(root, one.path)
    if (one.body === null) {
      rmSync(at, { force: true })
      took.push(one.path)
      continue
    }
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, one.body)
    wrote.push(one.path)
  }
  return { wrote, took }
}

const TEXT = new TextDecoder()

function textOf(body: Uint8Array | null): string | null {
  return body === null ? null : TEXT.decode(body)
}

function beforeOf(
  root: string,
  base: string,
  changed: readonly Change[]
): Map<string, string | null> {
  const held = new Map<string, string | null>()
  for (const one of changed) held.set(one.path, textOf(bodyAt(root, base, one.path)))
  return held
}

function indexed(
  root: string,
  changed: readonly Change[],
  before: ReadonlyMap<string, string | null>,
  keeping: Keeping
): readonly string[] {
  const held = keeping(indexIn(root), root)
  for (const one of changed) {
    const was = before.get(one.path) ?? null
    if (one.body === null) held.took(one.path, was)
    else held.wrote(one.path, TEXT.decode(one.body), was)
  }
  return held.settle()
}

function nameOf(root: string): string {
  try {
    return gitIn(root, ["rev-parse", "HEAD"]).trim()
  } catch {
    return UNNAMED
  }
}

function committed(
  root: string,
  paths: readonly string[],
  message: string,
  writer: string | null,
  base: string
): string | null {
  for (const one of paths) {
    try {
      gitIn(root, ["add", "--intent-to-add", "--", one])
    } catch {}
  }
  try {
    gitIn(root, ["diff", "--quiet", "HEAD", "--", ...paths])
    return null
  } catch {}
  const named = writer === null ? [] : [`--author=${writer}`]
  try {
    gitIn(root, ["commit", ...named, "-m", message, "--", ...paths])
  } catch (thrown) {
    const now = nameOf(root)
    if (now === base || now === UNNAMED) throw thrown
    return now
  }
  return nameOf(root)
}

export function landing(
  root: string,
  changes: readonly Change[],
  message: string,
  judging: Judging,
  writer: string | null = null
): Landed | Refused {
  if (changes.length === 0) {
    return { refusals: ["nothing was asked for, so nothing was judged and nothing was written"] }
  }
  return holding(root, () => {
    const base = baseOf(root)
    const proposed = { base, changed: changes }
    const leaving = leavingOf(root, proposed)
    const before = beforeOf(root, base, changes)
    const said = judged(judging, leaving)
    if (said.length > 0) {
      return {
        refusals: [
          ...said.map((one) => `${one.path} — ${one.reason}`),
          `nothing was written — ${changes.length} change(s) were asked for and they land together or not at all`,
        ],
      }
    }
    const keeping = indexingLoaded()
    const put = wroteOnto(root, changes)
    const noted = indexed(root, changes, before, keeping)
    const commit = committed(root, [...put.wrote, ...put.took].sort(), message, writer, base)
    return { base, commit, wrote: put.wrote, took: put.took, noted }
  })
}
