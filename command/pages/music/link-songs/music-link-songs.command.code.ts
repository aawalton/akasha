import {
  type Filed,
  type Filing,
  filingIn,
  songForTrack,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import {
  artistByRelease,
  artistOf,
  songNamed,
  valuesLinked,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { composedEdit } from "akasha/change/modules/page-editing/page-editing.module.code.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/command/argument/pages/dry-run.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { trackLimit } from "akasha/command/argument/pages/track-limit.argument.ts"
import {
  answering,
  DATA,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicLinkSongs as page } from "akasha/command/pages/music/link-songs/music-link-songs.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const SONG = "song"

const NAMED = [json, dryRun, trackLimit] as const

export type Taken = {
  readonly json: boolean
  readonly dryRun: boolean
  readonly limit: number | null
}

export type Counted = {
  readonly tracks: number
  readonly linked: number
  readonly relinked: number
  readonly unlinked: number
  readonly held: number
  readonly filed: number
  readonly unmatched: number
}

export type Linking = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function taken(
  argv: readonly string[],
  calledAs: string
): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  return {
    json: read.taken.json,
    dryRun: read.taken.dryRun,
    limit: read.taken.trackLimit ?? null,
  }
}

export function songOn(
  filing: Filing,
  byRelease: ReadonlyMap<string, string>,
  value: Value
): Filed | null {
  const artistSlug = artistOf(byRelease, value)
  const title = textIn(value, "title")
  if (artistSlug === null || title === null) return null
  return songForTrack(filing, artistSlug, title)
}

export function linkingIn(root: string, limit: number | null = null): Linking {
  const filing = filingIn(root)
  const byRelease = artistByRelease(root)
  const source = sourceFor(root)
  const changes: Asking[] = []
  let tracks = 0
  let linked = 0
  let relinked = 0
  let unlinked = 0
  let held = 0
  let filed = 0
  let unmatched = 0
  let acted = 0
  for (const one of valuesOfType(root, TRACK)) {
    if (limit !== null && acted >= limit) break
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    tracks += 1
    const was = songNamed(one.value)
    const said = songOn(filing, byRelease, one.value)
    const now = said === null ? null : said.slug
    if (said !== null && said.values !== null) {
      changes.push(composedEdit(root, SONG, said.slug, said.values, source))
      filed += 1
    }
    if (was === now) {
      if (now === null) unmatched += 1
      else held += 1
      continue
    }
    if (was === null) linked += 1
    else if (now === null) unlinked += 1
    else relinked += 1
    changes.push(composedEdit(root, TRACK, slug, valuesLinked(one.value, now), source))
    acted += 1
  }
  return { counts: { tracks, linked, relinked, unlinked, held, filed, unmatched }, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `tracks\t${counts.tracks}`,
    `linked\t${counts.linked}`,
    `relinked\t${counts.relinked}`,
    `unlinked\t${counts.unlinked}`,
    `already\t${counts.held}`,
    `filed\t${counts.filed}`,
    `unmatched\t${counts.unmatched}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `file ${counts.filed} song(s) and name the song on ${counts.linked + counts.relinked} track(s)`
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, DATA)
  const found = linkingIn(given.root, held.limit)
  const rows = held.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (held.dryRun || found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicLinkSongs(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await ran(argv, given, landing))
}
