import {
  artistNamed,
  artistsOfSong,
  artistsUnder,
  compositionTitle,
  songKey,
  songNamed,
  valuesLinked,
} from "akasha/alan/music/catalog/modules/song-matching/song-matching.module.code.ts"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { removeFileOfAnyKind } from "akasha/change/mechanical/file/remove/remove-file-of-any-kind/remove-file-of-any-kind.change-mechanical.ts"
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
import { musicFoldSongs as page } from "akasha/command/pages/music/fold-songs/music-fold-songs.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const SONG = "song"

const TRACK = "track"

const UNDER_ARTIST = "artist/"

const WRITTEN = "written"

const PART_OF = "partOfCollections"

const IDENTITY = "externalIdentity"

const WORK_PATH = "/work/"

const OWN = ["singability", "insights", "personalConnections", "reaction", "rank", "tags"] as const

const TAKE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const NAMED = [json] as const

export type Taken = { readonly json: boolean }

export type Held = {
  readonly slug: string
  readonly path: string
  readonly own: boolean
  readonly base: boolean
  readonly wrote: boolean
  readonly artist: string
  readonly value: Value
}

export type Counted = {
  readonly songs: number
  readonly groups: number
  readonly folded: number
  readonly relinked: number
  readonly joined: number
  readonly held: number
}

export type Folding = {
  readonly counts: Counted
  readonly changes: readonly Asking[]
  readonly held: readonly string[]
}

export function taken(
  argv: readonly string[],
  calledAs: string
): Taken | { readonly refused: string } {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return { refused: read.refused.join(" ") }
  return { json: read.taken.json }
}

export function ownValued(value: Value): boolean {
  return OWN.some((key) => value[key] !== undefined)
}

export function keptOf(held: readonly Held[]): Held | null {
  const written = held.filter((one) => one.own)
  if (written.length > 1) return null
  if (written.length === 1) return written[0] ?? null
  const wrote = held.filter((one) => one.wrote)
  const said = wrote.length > 0 ? wrote : held
  const titled = said.filter((one) => one.base)
  const pool = titled.length > 0 ? titled : said
  return (
    [...pool].sort((x, y) => x.slug.length - y.slug.length || (x.slug < y.slug ? -1 : 1))[0] ?? null
  )
}

export function workIdIn(value: Value): string | null {
  for (const one of recordsIn(value[IDENTITY])) {
    const link = textIn(one, "externalLink")
    const said = textIn(one, "externalId")
    if (link !== null && said !== null && link.includes(WORK_PATH)) return said
  }
  return null
}

export function keysOf(value: Value): readonly string[] {
  const title = textIn(value, "title")
  const under = artistNamed(value)
  const keys: string[] = []
  if (title !== null && under !== null) keys.push(songKey(under, compositionTitle(title)))
  const work = workIdIn(value)
  if (work !== null) keys.push(`${WORK_PATH}${work}`)
  return keys
}

function rootKey(up: ReadonlyMap<string, string>, key: string): string {
  let held = key
  for (;;) {
    const next = up.get(held)
    if (next === undefined || next === held) return held
    held = next
  }
}

export function groupedIn(root: string): ReadonlyMap<string, readonly Held[]> {
  const up = new Map<string, string>()
  const rows: { readonly key: string; readonly held: Held }[] = []
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    const title = textIn(one.value, "title")
    const under = artistNamed(one.value)
    if (slug === null || title === null || under === null) continue
    const keys = keysOf(one.value)
    const first = keys[0]
    if (first === undefined) continue
    for (const each of keys) up.set(rootKey(up, each), rootKey(up, first))
    rows.push({
      key: first,
      held: {
        slug,
        path: one.path,
        own: ownValued(one.value),
        base: songKey(under, title) === songKey(under, compositionTitle(title)),
        wrote: one.value[WRITTEN] !== undefined,
        artist: under,
        value: one.value,
      },
    })
  }
  const groups = new Map<string, Held[]>()
  for (const row of rows) {
    const key = rootKey(up, row.key)
    groups.set(key, [...(groups.get(key) ?? []), row.held])
  }
  return groups
}

export function partedOver(keep: Held, each: readonly Held[]): Value | null {
  const under = new Set(artistsUnder(keep.value))
  const was = under.size
  for (const one of each) {
    for (const said of artistsOfSong(one.value)) {
      if (said !== keep.artist) under.add(said)
    }
  }
  if (under.size === was) return null
  return { ...keep.value, [PART_OF]: [...under].map((one) => `${UNDER_ARTIST}${one}`) }
}

export function foldingIn(root: string): Folding {
  const groups = groupedIn(root)
  const source = sourceFor(root)
  const gone = new Map<string, { readonly keep: string; readonly path: string }>()
  const held: string[] = []
  const parted: Asking[] = []
  let songs = 0
  let folding = 0
  for (const [key, each] of groups) {
    songs += each.length
    if (each.length < 2) continue
    const keep = keptOf(each)
    if (keep === null) {
      held.push(key)
      continue
    }
    folding += 1
    const over = partedOver(keep, each)
    if (over !== null) parted.push(composedEdit(root, SONG, keep.slug, over, source))
    for (const one of each) {
      if (one.slug !== keep.slug) gone.set(one.slug, { keep: keep.slug, path: one.path })
    }
  }
  const changes: Asking[] = [...parted]
  let relinked = 0
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    const said = songNamed(one.value)
    if (slug === null || said === null) continue
    const now = gone.get(said)
    if (now === undefined) continue
    relinked += 1
    changes.push(composedEdit(root, TRACK, slug, valuesLinked(one.value, now.keep), source))
  }
  for (const [, one] of gone) changes.push({ at: TAKE, given: { at: one.path } })
  return {
    counts: {
      songs,
      groups: folding,
      folded: gone.size,
      relinked,
      joined: parted.length,
      held: held.length,
    },
    changes,
    held,
  }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `songs\t${counts.songs}`,
    `groups\t${counts.groups}`,
    `folded\t${counts.folded}`,
    `relinked\t${counts.relinked}`,
    `joined\t${counts.joined}`,
    `left\t${counts.held}`,
  ]
}

export function messageOf(counts: Counted): string {
  return (
    `fold ${counts.folded} song(s) into the ${counts.groups} composition(s) they are versions of, ` +
    `and put ${counts.joined} of those under every artist performing them`
  )
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const asked = taken(argv, given.calledAs)
  if ("refused" in asked) return refused(asked.refused, DATA)
  const found = foldingIn(given.root)
  const rows = asked.json
    ? [JSON.stringify(found.counts)]
    : [...rowsOf(found.counts), ...found.held.map((one) => `left\t${one}`)]
  if (found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicFoldSongs(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await ran(argv, given, landing))
}
