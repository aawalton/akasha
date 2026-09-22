import { slugSortingFirst } from "akasha/alan/music/catalog/modules/catalogue-slug/catalogue-slug.module.code.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { removeFilePage } from "akasha/change/mechanical/file/remove/remove-file-page/remove-file-page.change-mechanical-file.ts"
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
import { valuesHeard } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import { musicMergeTracks as page } from "akasha/command/pages/music/merge-tracks/music-merge-tracks.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  recordsIn,
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { sourceFor } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const TRACK = "track"

const TRACK_KEY = "trackKey"

const CARRIED_BY = "carriedBy"

const PART_OF = "partOfCollections"

const RELEASE = "release"

const SONG = "song"

const STATUS = "status"

const COMPLETED = "completed"

const TAKE = `${changeMechanicalFile.slug}/${removeFilePage.slug}` as const

const NAMED = [json, plan] as const

export type Held = {
  readonly slug: string
  readonly path: string
  readonly value: Value
}

export type Counted = {
  readonly tracks: number
  readonly keys: number
  readonly groups: number
  readonly merged: number
  readonly removed: number
  readonly skipped: number
}

export type Merging = { readonly counts: Counted; readonly changes: readonly Asking[] }

export function orderedBySlug(group: readonly Held[]): readonly Held[] {
  return [...group].toSorted((mine, theirs) =>
    mine.slug < theirs.slug ? -1 : mine.slug > theirs.slug ? 1 : 0
  )
}

export function survivorOf(group: readonly Held[]): Held | null {
  let kept: Held | null = null
  for (const one of group) {
    if (kept === null || slugSortingFirst(kept.slug, one.slug) === one.slug) kept = one
  }
  return kept
}

export function groupedOver(tracks: readonly Held[]): ReadonlyMap<string, readonly Held[]> {
  const held = new Map<string, Held[]>()
  for (const one of tracks) {
    const key = textIn(one.value, TRACK_KEY)
    if (key === null) continue
    const group = held.get(key) ?? []
    group.push(one)
    held.set(key, group)
  }
  return held
}

export function carriersOver(group: readonly Held[]): readonly Value[] {
  const byRelease = new Map<string, Value>()
  for (const one of orderedBySlug(group)) {
    for (const carrier of recordsIn(one.value[CARRIED_BY])) {
      const named = textIn(carrier, RELEASE)
      if (named === null || byRelease.has(named)) continue
      byRelease.set(named, carrier)
    }
  }
  const rows: Value[] = []
  for (const named of [...byRelease.keys()].sort()) {
    const held = byRelease.get(named)
    if (held !== undefined) rows.push(held)
  }
  return rows
}

export function collectionsOver(keep: Held, group: readonly Held[]): readonly string[] {
  const named: string[] = []
  for (const one of [keep, ...orderedBySlug(group)]) {
    const held = one.value[PART_OF]
    if (!Array.isArray(held)) continue
    for (const said of held) {
      if (typeof said === "string" && said !== "" && !named.includes(said)) named.push(said)
    }
  }
  return named
}

export function heardOver(group: readonly Held[]): boolean {
  return group.some((one) => textIn(one.value, STATUS) === COMPLETED)
}

export function songOver(keep: Held, group: readonly Held[]): string | null {
  if (textIn(keep.value, SONG) !== null) return null
  for (const one of orderedBySlug(group)) {
    const said = textIn(one.value, SONG)
    if (said !== null) return said
  }
  return null
}

export function valuesMerged(keep: Held, group: readonly Held[]): Value {
  const song = songOver(keep, group)
  const was: Value = {
    ...keep.value,
    ...(song === null ? {} : { [SONG]: song }),
    [PART_OF]: collectionsOver(keep, group),
    [CARRIED_BY]: carriersOver(group),
  }
  return heardOver(group) ? valuesHeard(was) : was
}

function tracksIn(root: string): readonly Held[] {
  const rows: Held[] = []
  for (const one of valuesOfType(root, TRACK)) {
    const slug = textIn(one.value, "slug")
    if (slug === null) continue
    rows.push({ slug, path: one.path, value: one.value })
  }
  return rows
}

function mergingOver(root: string, tracks: readonly Held[]): Merging {
  const source = sourceFor(root)
  const groups = groupedOver(tracks)
  const written: Asking[] = []
  const taken: Asking[] = []
  let gathered = 0
  let merged = 0
  let removed = 0
  let skipped = 0
  for (const one of tracks) {
    if (textIn(one.value, TRACK_KEY) === null) skipped += 1
  }
  for (const key of [...groups.keys()].sort()) {
    const group = groups.get(key) ?? []
    if (group.length < 2) continue
    gathered += 1
    const keep = survivorOf(group)
    if (keep === null) continue
    merged += 1
    written.push(composedEdit(root, TRACK, keep.slug, valuesMerged(keep, group), source))
    for (const one of orderedBySlug(group)) {
      if (one.slug === keep.slug) continue
      removed += 1
      taken.push({ at: TAKE, given: { at: one.path } })
    }
  }
  return {
    counts: {
      tracks: tracks.length,
      keys: groups.size,
      groups: gathered,
      merged,
      removed,
      skipped,
    },
    changes: [...written, ...taken],
  }
}

export function rowsOf(counts: Counted): readonly string[] {
  return [
    `tracks\t${counts.tracks}`,
    `keys\t${counts.keys}`,
    `groups\t${counts.groups}`,
    `merged\t${counts.merged}`,
    `removed\t${counts.removed}`,
    `skipped\t${counts.skipped}`,
  ]
}

export function messageOf(counts: Counted): string {
  return `leave one track page for ${counts.merged} recording(s) and take ${counts.removed} away`
}

async function answered(argv: readonly string[], given: Given, landing: Landing): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), DATA)
  const found = mergingOver(given.root, tracksIn(given.root))
  const rows = read.taken.json ? [JSON.stringify(found.counts)] : rowsOf(found.counts)
  if (read.taken.plan || found.changes.length === 0) return told(rows)
  const landed = await landing(given.root, found.changes, messageOf(found.counts))
  const wrong = "refusals" in landed ? landed.refusals : landed.wrong
  if (wrong.length > 0) return refused(wrong.join("; "), DATA)
  return told(rows)
}

export async function musicMergeTracks(
  argv: readonly string[],
  given: Given,
  landing: Landing = runMechanicalChange
): Promise<Answer> {
  return await answering(async () => await answered(argv, given, landing))
}
