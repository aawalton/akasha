import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const MIRROR = "the mirror this change was written into"

export type Placed = {
  readonly path: string
  readonly line: number
  readonly column: number
}

export type Looked<Found extends Placed> = {
  readonly found: readonly Found[]
  readonly failed: string | null
}

export type Saying<Found extends Placed> = {
  readonly reasonOf: (one: Found) => string
  readonly unlooked: string
}

export function carriedOver(
  paths: readonly string[],
  named: (path: string) => boolean,
  holds: (path: string) => boolean
): readonly string[] {
  return [...new Set(paths.filter((one) => named(one) && holds(one)))].sort()
}

export function carriedIn(change: Change, named: (path: string) => boolean): readonly string[] {
  return carriedOver(change.changed, named, (one) => change.after(one) !== null)
}

function earlier(one: Placed, two: Placed): number {
  if (one.path !== two.path) return one.path < two.path ? -1 : 1
  if (one.line !== two.line) return one.line - two.line
  return one.column - two.column
}

export function judgedAcross<Found extends Placed>(
  looked: Looked<Found>,
  first: string,
  root: string,
  saying: Saying<Found>
): readonly Judged[] {
  if (looked.failed === null) {
    const held = [...looked.found].sort(earlier)
    return held.map((one) => ({ path: one.path, reason: saying.reasonOf(one) }))
  }
  const why = looked.failed.replaceAll(`${root}/`, "").replaceAll(root, MIRROR)
  return [{ path: first, reason: `${why}. ${saying.unlooked}`, threw: true }]
}
