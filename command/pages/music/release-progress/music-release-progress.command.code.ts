import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { plan } from "akasha/command/argument/pages/plan.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { releaseOf } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { musicReleaseProgress as page } from "akasha/command/pages/music/release-progress/music-release-progress.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const STATUS = "status"

const OWN_LENGTH = "ownLength"

const OWN_PROGRESS = "ownProgress"

const COMPLETED = "completed"

const IN_PROGRESS = "in-progress"

const NOT_STARTED = "not-started"

const EPSILON = 0.01

const NAMED = [json, plan] as const

export type Ran = { readonly length: number; readonly progress: number }

export type Counted = {
  readonly releases: number
  readonly covered: number
  readonly uncovered: number
  readonly changed: number
  readonly unchanged: number
  readonly finished: number
  readonly partWay: number
  readonly unstarted: number
}

export type Rolling = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function ranOver(tracks: readonly Value[]): Ran {
  let length = 0
  let progress = 0
  for (const one of tracks) {
    length += numberAt(one, OWN_LENGTH) ?? 0
    progress += numberAt(one, OWN_PROGRESS) ?? 0
  }
  return { length, progress }
}

export function covers(over: Ran, said: number | null): boolean {
  if (said === null) return false
  return over.length >= said - EPSILON
}

export function statusOf(over: Ran): string {
  if (over.progress <= EPSILON) return NOT_STARTED
  return over.progress >= over.length - EPSILON ? COMPLETED : IN_PROGRESS
}

export function valuesRolled(was: Value, over: Ran): Value | null {
  const status = statusOf(over)
  const held = numberAt(was, OWN_PROGRESS)
  const same = held !== null && Math.abs(held - over.progress) <= EPSILON
  if (same && textIn(was, STATUS) === status) return null
  return { ...was, [STATUS]: status, [OWN_PROGRESS]: over.progress }
}

export function tracksByReleaseIn(root: string): ReadonlyMap<string, readonly Value[]> {
  const held = new Map<string, Value[]>()
  for (const one of valuesOfType(root, TRACK)) {
    const named = releaseOf(one.value)
    if (named === null) continue
    const carried = held.get(named) ?? []
    carried.push(one.value)
    held.set(named, carried)
  }
  return held
}

export function rollingIn(root: string): Rolling {
  const source = sourceFor(root)
  const byRelease = tracksByReleaseIn(root)
  const changes: Asking[] = []
  let releases = 0
  let covered = 0
  let uncovered = 0
  let changed = 0
  let unchanged = 0
  let finished = 0
  let partWay = 0
  let unstarted = 0
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    releases += 1
    const tracks = byRelease.get(slug) ?? []
    const over = ranOver(tracks)
    if (tracks.length === 0 || !covers(over, numberAt(one.value, OWN_LENGTH))) {
      uncovered += 1
      continue
    }
    covered += 1
    const said = statusOf(over)
    if (said === COMPLETED) finished += 1
    else if (said === NOT_STARTED) unstarted += 1
    else partWay += 1
    const values = valuesRolled(one.value, over)
    if (values === null) {
      unchanged += 1
      continue
    }
    changed += 1
    changes.push(composedEdit(root, RELEASE, slug, values, source))
  }
  const counts = {
    releases,
    covered,
    uncovered,
    changed,
    unchanged,
    finished,
    partWay,
    unstarted,
  }
  return { counts, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `releases\t${counts.releases}`,
    `covered\t${counts.covered}`,
    `uncovered\t${counts.uncovered}`,
    `changed\t${counts.changed}`,
    `unchanged\t${counts.unchanged}`,
    `finished\t${counts.finished}`,
    `part-way\t${counts.partWay}`,
    `not-started\t${counts.unstarted}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `read ${counts.changed} release(s) off the tracks each carries`
}

async function answered(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const found = rollingIn(given.root)
  const rows = read.taken.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (read.taken.plan || found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicReleaseProgress(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, landing))
}
