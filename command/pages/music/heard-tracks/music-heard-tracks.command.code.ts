import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { filedIn } from "akasha/command/pages/music/capture/music-capture.command.code.ts"
import { musicHeardTracks as page } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  slugsUnder,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const CARRIED_BY = "carriedBy"

const EXTERNAL_ID = "externalId"

const PART_OF = "partOfCollections"

const STATUS = "status"

const OWN_LENGTH = "ownLength"

const OWN_PROGRESS = "ownProgress"

const COMPLETED = "completed"

const UNDER = `${RELEASE}/`

const NAMED = [json] as const

export type Heard = "release" | "listening" | null

export type Counted = {
  readonly tracks: number
  readonly heard: number
  readonly byRelease: number
  readonly byListening: number
  readonly already: number
  readonly unheard: number
}

export type Marking = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function releasesOf(value: Value): readonly string[] {
  return slugsUnder(value[PART_OF], UNDER)
}

export function carriedIdsIn(value: Value): readonly string[] {
  const held: string[] = []
  for (const one of recordsIn(value[CARRIED_BY])) {
    const said = textIn(one, EXTERNAL_ID)
    if (said !== null) held.push(said)
  }
  return held
}

export function heardBy(
  value: Value,
  finished: ReadonlySet<string>,
  heardIds: ReadonlySet<string>
): Heard {
  if (releasesOf(value).some((one) => finished.has(one))) return RELEASE
  return carriedIdsIn(value).some((one) => heardIds.has(one)) ? "listening" : null
}

export function finishedReleasesIn(root: string): ReadonlySet<string> {
  const held = new Set<string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    if (textIn(one.value, STATUS) === COMPLETED) held.add(slug)
  }
  return held
}

export function heardIdsIn(root: string): ReadonlySet<string> | { readonly refused: string } {
  const filed = filedIn(root)
  if ("refused" in filed) return filed
  return filed.ledger.heardIds
}

export function valuesHeard(was: Value): Value {
  const held = was[OWN_LENGTH]
  const minutes = typeof held === "number" ? held : 0
  return { ...was, [STATUS]: COMPLETED, [OWN_PROGRESS]: minutes }
}

export function markingIn(
  root: string,
  finished: ReadonlySet<string>,
  heardIds: ReadonlySet<string>
): Marking {
  const source = sourceFor(root)
  const changes: Asking[] = []
  let tracks = 0
  let heard = 0
  let byRelease = 0
  let byListening = 0
  let already = 0
  let unheard = 0
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    tracks += 1
    const said = heardBy(one.value, finished, heardIds)
    if (said === null) {
      unheard += 1
      continue
    }
    heard += 1
    if (said === RELEASE) byRelease += 1
    else byListening += 1
    if (textIn(one.value, STATUS) === COMPLETED) {
      already += 1
      continue
    }
    changes.push(composedEdit(root, TRACK, slug, valuesHeard(one.value), source))
  }
  const counts = { tracks, heard, byRelease, byListening, already, unheard }
  return { counts, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `tracks\t${counts.tracks}`,
    `heard\t${counts.heard}`,
    `by-release\t${counts.byRelease}`,
    `by-listening\t${counts.byListening}`,
    `already\t${counts.already}`,
    `unheard\t${counts.unheard}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `mark ${counts.heard - counts.already} track(s) as heard`
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const heardIds = heardIdsIn(given.root)
  if ("refused" in heardIds) return refused(heardIds.refused, DATA)
  const found = markingIn(given.root, finishedReleasesIn(given.root), heardIds)
  const rows = read.taken.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicHeardTracks(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await ran(argv, given, landing))
}
