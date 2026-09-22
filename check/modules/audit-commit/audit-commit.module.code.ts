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
    pageOf,
    index: answeringOver(reading, pageOf),
  }
}
