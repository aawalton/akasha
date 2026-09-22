import { readFileSync, statSync } from "node:fs"
import { join } from "node:path"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  classifyExtension,
  typeScripted,
} from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { sortedOnce } from "akasha/code/type/narrowing/modules/sorted-once/sorted-once.module.code.ts"
import {
  type Answering,
  answeringOver,
} from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  INDEX_AT,
  underIndex,
} from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { valueIn } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

export type Paged = {
  readonly pageOf: (path: string) => Value | null
  readonly index: Answering
}

export type Commit = Paged & {
  readonly root: string
  readonly paths: readonly string[]
  readonly read: (path: string) => string | null
  readonly bytes: (path: string) => Uint8Array | null
}

const PATHS_FROM = "--"

const EXCEPT = ":(exclude)"

const EXCEPT_INDEX = `${EXCEPT}${INDEX_AT}`

const APART = "\0"

export function filesIn(root: string): readonly string[] {
  const done = ran([
    "git",
    "-C",
    root,
    "ls-files",
    "-z",
    "--exclude-standard",
    "--cached",
    PATHS_FROM,
    EXCEPT_INDEX,
  ])
  if (done.code !== 0) {
    throw new Error(`the commit at ${root} names no files — ${done.err.trim()}`)
  }
  const found = done.out.split(APART).filter((one) => one !== "")
  return sortedOnce(found).filter((one) => !underIndex(one))
}

export type Taking = (path: string) => boolean

export type Saying = (path: string, text: string) => readonly string[]

const BODIED: ReadonlySet<string> = new Set(["ts", "tsx", "css"])

export function bodied(path: string): boolean {
  const kind = classifyExtension(path)
  return kind !== null && BODIED.has(kind)
}

export function pagedIn(paged: Paged, path: string): boolean {
  return pageNamed(path, paged.index.pageTypesIn())
}

export function overEachIn(commit: Commit, taking: Taking, saying: Saying): readonly Judged[] {
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (!taking(path)) continue
    const text = commit.read(path)
    if (text === null) continue
    for (const reason of saying(path, text)) said.push({ path, reason })
  }
  return said
}

export function overEachText(commit: Commit, saying: Saying): readonly Judged[] {
  return overEachIn(commit, typeScripted, saying)
}

export function overEachBody(commit: Commit, saying: Saying): readonly Judged[] {
  return overEachIn(commit, bodied, saying)
}

function bytesOf(root: string, path: string): Uint8Array | null {
  const at = join(root, path)
  const held = statSync(at, { throwIfNoEntry: false })
  if (held === undefined || !held.isFile()) return null
  return readFileSync(at)
}

export function commitIn(root: string): Commit {
  const reading = readingIn(root)
  const held = new Map<string, Value | null>()
  const pageOf = (path: string): Value | null => {
    const found = held.get(path)
    if (found !== undefined || held.has(path)) return found ?? null
    const body = reading.read(path)
    const made = body === null ? null : valueIn(body)
    held.set(path, made)
    return made
  }
  return {
    root,
    paths: filesIn(root),
    read: reading.read,
    bytes: (path) => bytesOf(root, path),
    pageOf,
    index: answeringOver(reading, pageOf),
  }
}
