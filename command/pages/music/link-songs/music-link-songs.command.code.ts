import {
  songSlugFor,
  songsFiledIn,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import type { Asking } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import {
  type Landing,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { dryRun } from "akasha/command/argument/pages/dry-run.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
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
import {
  composedFor,
  sourceFor,
} from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const RELEASE = "release"

const SONG = "song"

const SONG_KEY = "song"

const WRITE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const NAMED = [json, dryRun] as const

export type Taken = { readonly json: boolean; readonly dryRun: boolean }

export type Counted = {
  readonly tracks: number
  readonly linked: number
  readonly relinked: number
  readonly unlinked: number
  readonly held: number
  readonly unmatched: number
}

export type Linking = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function taken(
  argv: readonly string[],
  calledAs: string
): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  return { json: read.taken.json, dryRun: read.taken.dryRun }
}

export function artistByRelease(root: string): ReadonlyMap<string, string> {
  const byRelease = new Map<string, string>()
  for (const one of valuesOfType(root, RELEASE)) {
    const slug = textIn(one.value, "slug")
    const artistSlug = slugsIn(one.value["partOfCollections"])[0]
    if (slug === null || artistSlug === undefined) continue
    byRelease.set(slug, artistSlug)
  }
  return byRelease
}

export function songNamed(value: Value): string | null {
  const said = textIn(value, SONG_KEY)
  if (said === null) return null
  return said.startsWith(`${SONG}/`) ? said.slice(SONG.length + 1) : said
}

export function songMatched(
  songs: ReadonlyMap<string, string>,
  byRelease: ReadonlyMap<string, string>,
  value: Value
): string | null {
  const releaseSlug = slugsIn(value["partOfCollections"])[0]
  if (releaseSlug === undefined) return null
  const artistSlug = byRelease.get(releaseSlug)
  if (artistSlug === undefined) return null
  const title = textIn(value, "title")
  if (title === null) return null
  return songSlugFor(songs, artistSlug, title)
}

export function valuesLinked(value: Value, song: string | null): Value {
  const held: Value = { ...value }
  if (song === null) {
    delete held[SONG_KEY]
    return held
  }
  return { ...held, [SONG_KEY]: `${SONG}/${song}` }
}

export function linkingIn(root: string): Linking {
  const songs = songsFiledIn(root)
  const byRelease = artistByRelease(root)
  const source = sourceFor(root)
  const changes: Asking[] = []
  let tracks = 0
  let linked = 0
  let relinked = 0
  let unlinked = 0
  let held = 0
  let unmatched = 0
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    tracks += 1
    const was = songNamed(one.value)
    const now = songMatched(songs, byRelease, one.value)
    if (was === now) {
      if (now === null) unmatched += 1
      else held += 1
      continue
    }
    if (was === null) linked += 1
    else if (now === null) unlinked += 1
    else relinked += 1
    const composed = composedFor(
      root,
      { pageTypeSlug: TRACK, slug, values: valuesLinked(one.value, now) },
      source
    )
    if ("refused" in composed) {
      throw new Error(`\`${TRACK}/${slug}\` went uncomposed: ${composed.refused}`)
    }
    changes.push({ at: WRITE, given: { at: composed.put.path, body: composed.put.content } })
  }
  return { counts: { tracks, linked, relinked, unlinked, held, unmatched }, changes }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `tracks\t${counts.tracks}`,
    `linked\t${counts.linked}`,
    `relinked\t${counts.relinked}`,
    `unlinked\t${counts.unlinked}`,
    `already\t${counts.held}`,
    `unmatched\t${counts.unmatched}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `name the song on ${counts.linked + counts.relinked} track(s) and take it off ${counts.unlinked}`
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const held = taken(argv, given.calledAs)
  if ("refused" in held) return refused(held.refused, DATA)
  const found = linkingIn(given.root)
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
