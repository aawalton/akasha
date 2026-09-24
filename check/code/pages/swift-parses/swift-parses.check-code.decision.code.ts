import { mirroredOf } from "akasha/check/modules/change-mirror/change-mirror.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import {
  carriedIn,
  judgedAcross,
  type Looked,
  type Saying,
} from "akasha/check/modules/tool-faults/tool-faults.module.code.ts"
import { classifyExtension } from "akasha/code/body/modules/file-kind/file-kind.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const SWIFT = "swift"

const TOOL = "swift-format"

const ARGV: readonly string[] = ["lint", "--no-color-diagnostics"]

const CLEAN = 0

const FAULTED = 1

const ERROR_RE = /^(.+):(\d+):(\d+): error: (.*)$/

const UNLOOKED = "A parser that could not look has verified nothing, so this change is not judged."

const SAID_AT_MOST = 240

export type Found = {
  readonly path: string
  readonly line: number
  readonly column: number
  readonly said: string
}

export function swiftNamed(path: string): boolean {
  return classifyExtension(path) === SWIFT
}

export function foundIn(err: string, root: string): readonly Found[] {
  const found: Found[] = []
  for (const text of err.split("\n")) {
    const one = ERROR_RE.exec(text)
    if (one === null) continue
    const at = one[1] ?? ""
    found.push({
      path: at.startsWith(`${root}/`) ? at.slice(root.length + 1) : at,
      line: Number(one[2]),
      column: Number(one[3]),
      said: one[4] ?? "",
    })
  }
  return found
}

export function lookedOver(
  root: string,
  named: readonly string[],
  at: string | null
): Looked<Found> {
  if (at === null) {
    return { found: [], failed: `no \`${TOOL}\` is on PATH, so nothing was looked at` }
  }
  const done = ran([at, ...ARGV, ...named], { cwd: root })
  const found = foundIn(done.err, root)
  if (done.code === CLEAN || (done.code === FAULTED && found.length > 0)) {
    return { found, failed: null }
  }
  const why = done.err.trim().slice(0, SAID_AT_MOST)
  return { found: [], failed: `\`${TOOL}\` exited ${done.code} and said no parse error — ${why}` }
}

export function reasonOf(one: Found): string {
  return `the Swift does not parse at line ${one.line}, column ${one.column} — ${one.said}`
}

const SAYING: Saying<Found> = { reasonOf, unlooked: UNLOOKED }

export function refusalsAcross(
  carried: readonly string[],
  bytes: (path: string) => Uint8Array | null
): readonly Judged[] {
  const first = carried[0]
  if (first === undefined) return []
  const mirror = mirroredOf(carried, bytes)
  try {
    const looked = lookedOver(mirror.root, carried, Bun.which(TOOL))
    return judgedAcross(looked, first, mirror.root, SAYING)
  } finally {
    mirror.sweep()
  }
}

export function refusalsOver(change: Change): readonly Judged[] {
  return refusalsAcross(carriedIn(change, swiftNamed), change.after)
}
