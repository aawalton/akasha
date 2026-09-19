import {
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
import { dryRun } from "akasha/command/argument/pages/dry-run.argument.ts"
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
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const SONG = "song"

const TRACK = "track"

const UNDER_ARTIST = "artist/"

const OWN = ["singability", "insights", "personalConnections", "reaction", "rank", "tags"] as const

const TAKE = `${changeMechanical.slug}/${removeFileOfAnyKind.slug}` as const

const NAMED = [json, dryRun] as const

export type Taken = { readonly json: boolean; readonly dryRun: boolean }

export type Held = {
  readonly slug: string
  readonly path: string
  readonly own: boolean
  readonly base: boolean
}

export type Counted = {
  readonly songs: number
  readonly groups: number
  readonly folded: number
  readonly relinked: number
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
  return { json: read.taken.json, dryRun: read.taken.dryRun }
}

export function ownValued(value: Value): boolean {
  return OWN.some((key) => value[key] !== undefined)
}

export function keptOf(held: readonly Held[]): Held | null {
  const written = held.filter((one) => one.own)
  if (written.length > 1) return null
  if (written.length === 1) return written[0] ?? null
  const titled = held.filter((one) => one.base)
  const pool = titled.length > 0 ? titled : held
  return (
    [...pool].sort((x, y) => x.slug.length - y.slug.length || (x.slug < y.slug ? -1 : 1))[0] ?? null
  )
}

export function groupedIn(root: string): ReadonlyMap<string, readonly Held[]> {
  const groups = new Map<string, Held[]>()
  for (const one of valuesOfType(root, SONG)) {
    const slug = textIn(one.value, "slug")
    const title = textIn(one.value, "title")
    const artist = textIn(one.value, "artist")
    if (slug === null || title === null || artist === null) continue
    const under = artist.startsWith(UNDER_ARTIST) ? artist.slice(UNDER_ARTIST.length) : artist
    const key = songKey(under, compositionTitle(title))
    const kept = groups.get(key) ?? []
    kept.push({
      slug,
      path: one.path,
      own: ownValued(one.value),
      base: songKey(under, title) === key,
    })
    groups.set(key, kept)
  }
  return groups
}

export function foldingIn(root: string): Folding {
  const groups = groupedIn(root)
  const source = sourceFor(root)
  const gone = new Map<string, { readonly keep: string; readonly path: string }>()
  const held: string[] = []
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
    for (const one of each) {
      if (one.slug !== keep.slug) gone.set(one.slug, { keep: keep.slug, path: one.path })
    }
  }
  const changes: Asking[] = []
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
    counts: { songs, groups: folding, folded: gone.size, relinked, held: held.length },
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
    `left\t${counts.held}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `fold ${counts.folded} song(s) into the ${counts.groups} composition(s) they are versions of`
}

async function ran(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const asked = taken(argv, given.calledAs)
  if ("refused" in asked) return refused(asked.refused, DATA)
  const found = foldingIn(given.root)
  const rows = asked.json
    ? [JSON.stringify(found.counts)]
    : [...rowsOf(found.counts), ...found.held.map((one) => `left\t${one}`)]
  if (asked.dryRun || found.changes.length === 0) return told(rows)
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
