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
import { releasesOf } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { musicReleaseParts as page } from "akasha/command/pages/music/release-parts/music-release-parts.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const OWN_LENGTH = "ownLength"

const OWN_PROGRESS = "ownProgress"

const EPSILON = 0.01

const NAMED = [json, plan] as const

export type Counted = {
  readonly releases: number
  readonly covered: number
  readonly uncovered: number
  readonly cleared: number
  readonly already: number
}

export type Clearing = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function lengthOver(tracks: readonly Value[]): number {
  let length = 0
  for (const one of tracks) length += numberAt(one, OWN_LENGTH) ?? 0
  return length
}

export function covers(ran: number, said: number | null): boolean {
  if (said === null) return false
  return ran >= said - EPSILON
}

export function statesNothing(was: Value): boolean {
  return (numberAt(was, OWN_LENGTH) ?? 0) === 0 && (numberAt(was, OWN_PROGRESS) ?? 0) === 0
}

export function valuesCleared(was: Value): Value {
  return { ...was, [OWN_LENGTH]: 0, [OWN_PROGRESS]: 0 }
}

export function tracksByRelease(tracks: readonly Value[]): ReadonlyMap<string, readonly Value[]> {
  const held = new Map<string, Value[]>()
  for (const one of tracks) {
    for (const named of releasesOf(one)) {
      const carried = held.get(named) ?? []
      carried.push(one)
      held.set(named, carried)
    }
  }
  return held
}

export function tracksByReleaseIn(root: string): ReadonlyMap<string, readonly Value[]> {
  return tracksByRelease(valuesOfType(root, TRACK).map((one) => one.value))
}

export function clearingIn(root: string): Clearing {
  const source = sourceFor(root)
  const byRelease = tracksByReleaseIn(root)
  const changes: Asking[] = []
  let releases = 0
  let covered = 0
  let uncovered = 0
  let cleared = 0
  let already = 0
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    releases += 1
    const tracks = byRelease.get(slug) ?? []
    if (tracks.length === 0 || !covers(lengthOver(tracks), numberAt(one.value, OWN_LENGTH))) {
      uncovered += 1
      continue
    }
    covered += 1
    if (statesNothing(one.value)) {
      already += 1
      continue
    }
    cleared += 1
    changes.push(composedEdit(root, RELEASE, slug, valuesCleared(one.value), source))
  }
  return { counts: { releases, covered, uncovered, cleared, already }, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `releases\t${counts.releases}`,
    `covered\t${counts.covered}`,
    `uncovered\t${counts.uncovered}`,
    `cleared\t${counts.cleared}`,
    `already\t${counts.already}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `take the own length off ${counts.cleared} release(s) their tracks carry`
}

async function answered(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const found = clearingIn(given.root)
  const rows = read.taken.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (read.taken.plan || found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicReleaseParts(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, landing))
}
