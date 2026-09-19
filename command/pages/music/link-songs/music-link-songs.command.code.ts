import {
  type Filed,
  type Filing,
  filingIn,
  songFiledFor,
} from "akasha/alan/music/catalog/modules/song-filing/song-filing.module.code.ts"
import { songSlugFor } from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
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
  slugsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const SONG = "song"

const SONG_KEY = "song"

const UNDER_ARTIST = "artist/"

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

export function artistUnder(value: Value): string | null {
  const held = value["partOfCollections"]
  if (!Array.isArray(held)) return null
  for (const said of held) {
    if (typeof said === "string" && said.startsWith(UNDER_ARTIST)) {
      return said.slice(UNDER_ARTIST.length)
    }
  }
  return null
}

export function artistByRelease(root: string): ReadonlyMap<string, string> {
  const byRelease = new Map<string, string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    const artistSlug = artistUnder(one.value)
    if (slug === null || artistSlug === null) continue
    byRelease.set(slug, artistSlug)
  }
  return byRelease
}

export function songNamed(value: Value): string | null {
  const said = textIn(value, SONG_KEY)
  if (said === null) return null
  return said.startsWith(`${SONG}/`) ? said.slice(SONG.length + 1) : said
}

export function artistOf(byRelease: ReadonlyMap<string, string>, value: Value): string | null {
  const releaseSlug = slugsIn(value["partOfCollections"])[0]
  if (releaseSlug === undefined) return null
  return byRelease.get(releaseSlug) ?? null
}

export function songMatched(
  songs: ReadonlyMap<string, string>,
  byRelease: ReadonlyMap<string, string>,
  value: Value
): string | null {
  const artistSlug = artistOf(byRelease, value)
  const title = textIn(value, "title")
  if (artistSlug === null || title === null) return null
  return songSlugFor(songs, artistSlug, title)
}

export function songFiledOn(
  filing: Filing,
  byRelease: ReadonlyMap<string, string>,
  value: Value
): Filed | null {
  const artistSlug = artistOf(byRelease, value)
  const title = textIn(value, "title")
  if (artistSlug === null || title === null) return null
  return songFiledFor(filing, artistSlug, title)
}

export function valuesLinked(value: Value, song: string | null): Value {
  const held: Value = { ...value }
  if (song === null) {
    delete held[SONG_KEY]
    return held
  }
  return { ...held, [SONG_KEY]: `${SONG}/${song}` }
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
    let now = songMatched(filing.songs, byRelease, one.value)
    if (now === null) {
      const said = songFiledOn(filing, byRelease, one.value)
      if (said !== null) {
        now = said.slug
        if (said.values !== null) {
          changes.push(composedEdit(root, SONG, said.slug, said.values, source))
          filed += 1
        }
      }
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
