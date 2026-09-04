import { join } from "node:path"
import { landingAsked, textAt, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { saidBy } from "@akasha/command-system/fault-saying"
import type { FileEdit } from "@akasha/command-system/landing"
import { valuesOfType } from "@akasha/indexes"
import { entriesAt } from "@akasha/pages-system/page-entries"
import { besideAt } from "@akasha/pages-system/page-file-name"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { getRecentlyPlayed } from "@akasha/spotify/player"
import {
  buildPlayRow,
  esoDayOfPlay,
  heardKeyOf,
  isFirstListen,
  type PlayInput,
  type PlayRow,
  playKeyOf,
  resumeCursorMs,
  sumNewMusicMinutes,
} from "../play-row/play-row.module.code.ts"

const INPUT = 1

const DATA = 2

const OPERATIONAL = 3

const ESO_DAY = "eso-day"

const HEARD_MUSIC = "heard-music"

const LISTENS = "listens"

const TRACKS = "tracks"

const JSONL = "jsonl"

const NEWLINE = "\n"

const MAX_RECENTLY_PLAYED = 50

const OBSERVED = "observed"

const SEED_PRIOR_WINDOW = "seed-prior-window"

const DRY_RUN_SAID = "--dry-run"

const JSON_SAID = "--json"

const BARE = [DRY_RUN_SAID, JSON_SAID]

const NOTHING_NEW = "nothing was played that is not already filed, so nothing landed"

export type Played = {
  readonly track: unknown
  readonly played_at: string
}

export type Fetched = {
  readonly items: readonly Played[]
}

export type Asking = {
  readonly limit: number
  readonly after?: number
}

export type Plays = (asking: Asking) => Promise<Fetched>

export type ProviderTrack = {
  readonly id: string
  readonly name: string
  readonly durationMs: number | undefined
  readonly artistName: string
}

export type Ledger = {
  readonly playKeys: ReadonlySet<string>
  readonly heardIds: ReadonlySet<string>
  readonly heardKeys: ReadonlySet<string>
  readonly newestPlayedAt: string | null
}

export type Filed = {
  readonly heardPage: string
  readonly ledger: Ledger
}

export type Planned = {
  readonly listens: ReadonlyMap<string, readonly Value[]>
  readonly heard: readonly Value[]
  readonly fetched: number
  readonly recorded: number
  readonly alreadyRecorded: number
  readonly firstListens: number
  readonly skippedUnidentified: number
  readonly newMusicMinutes: number
  readonly primed: boolean
}

export type Taken = {
  readonly dryRun: boolean
  readonly json: boolean
}

export type Reading = Taken | { readonly refused: string }

export function taken(argv: readonly string[]): Reading {
  const said = new Set<string>()
  for (const one of argv) {
    if (!BARE.includes(one)) return { refused: `\`${one}\` is nothing this takes` }
    if (said.has(one)) {
      return { refused: `\`${one}\` is named twice, and once says all it says` }
    }
    said.add(one)
  }
  return { dryRun: said.has(DRY_RUN_SAID), json: said.has(JSON_SAID) }
}

function heldIn(raw: unknown, key: string): unknown {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return undefined
  return (raw as Record<string, unknown>)[key]
}

function namedIn(raw: unknown): string | null {
  const said = heldIn(raw, "name")
  if (said === undefined || said === null) return ""
  return typeof said === "string" ? said : null
}

export function providerTrackIn(raw: unknown): ProviderTrack | null {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null
  const id = heldIn(raw, "id")
  if (typeof id !== "string" || id === "") return null
  const name = namedIn(raw)
  if (name === null) return null
  const durationMs = heldIn(raw, "duration_ms")
  if (durationMs !== undefined && typeof durationMs !== "number") return null
  const artists = heldIn(raw, "artists")
  if (artists !== undefined && !Array.isArray(artists)) return null
  const artistName = artists === undefined ? "" : (namedIn(artists[0]) ?? "")
  return { id, name, durationMs, artistName }
}

export function readPlay(item: Played): PlayInput | null {
  const track = providerTrackIn(item.track)
  if (track === null) return null
  return {
    trackId: track.id,
    trackName: track.name,
    artistName: track.artistName,
    playedAt: item.played_at,
    durationMs: track.durationMs,
  }
}

export function askingFor(ledger: Ledger): Asking {
  const after = resumeCursorMs(ledger.newestPlayedAt)
  return { limit: MAX_RECENTLY_PLAYED, ...(after === undefined ? {} : { after }) }
}

function listenRowOf(row: PlayRow): Value {
  return {
    playKey: row.playKey,
    spotifyTrackId: row.spotifyTrackId,
    playedAt: row.playedAt,
    trackName: row.trackName,
    artistName: row.artistName,
    minutes: row.minutes,
    firstListen: row.firstListen,
    newMusicMinutes: row.newMusicMinutes,
  }
}

function heardRowOf(play: PlayInput, titleKey: string, priming: boolean): Value {
  return {
    spotifyTrackId: play.trackId,
    titleKey,
    trackName: play.trackName,
    artistName: play.artistName,
    firstHeardAt: play.playedAt,
    heardSource: priming ? SEED_PRIOR_WINDOW : OBSERVED,
  }
}

export function plannedOver(items: readonly Played[], ledger: Ledger): Planned {
  const priming = ledger.newestPlayedAt === null
  const oldestFirst = [...items].sort((one, two) => one.played_at.localeCompare(two.played_at))
  const playKeys = new Set(ledger.playKeys)
  const heardIds = new Set(ledger.heardIds)
  const heardKeys = new Set(ledger.heardKeys)
  const listens = new Map<string, Value[]>()
  const heard: Value[] = []
  const made: PlayRow[] = []
  let alreadyRecorded = 0
  let firstListens = 0
  let skippedUnidentified = 0

  for (const item of oldestFirst) {
    const play = readPlay(item)
    if (play === null) {
      skippedUnidentified += 1
      continue
    }
    const key = playKeyOf(play.trackId, play.playedAt)
    if (playKeys.has(key)) {
      alreadyRecorded += 1
      continue
    }
    const titleKey = heardKeyOf(play.trackName, play.artistName)
    const alreadyHeard = heardIds.has(play.trackId) || heardKeys.has(titleKey)
    if (!alreadyHeard) {
      heardIds.add(play.trackId)
      heardKeys.add(titleKey)
      heard.push(heardRowOf(play, titleKey, priming))
    }
    const firstListen = isFirstListen(priming, alreadyHeard)
    const row = buildPlayRow(play, firstListen)
    const day = esoDayOfPlay(play.playedAt)
    const held = listens.get(day) ?? []
    held.push(listenRowOf(row))
    listens.set(day, held)
    playKeys.add(key)
    made.push(row)
    if (firstListen) firstListens += 1
  }

  return {
    listens,
    heard,
    fetched: items.length,
    recorded: made.length,
    alreadyRecorded,
    firstListens,
    skippedUnidentified,
    newMusicMinutes: sumNewMusicMinutes(made),
    primed: priming,
  }
}

export function heardPageIn(root: string): string | { readonly refused: string } {
  const found = valuesOfType(root, HEARD_MUSIC)
  const only = found.length === 1 ? found[0] : undefined
  if (only === undefined) {
    return {
      refused: `capture writes one \`${HEARD_MUSIC}\` page and the index holds ${found.length}`,
    }
  }
  return only.path
}

function textIn(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" && held !== "" ? held : null
}

export function filedIn(root: string): Filed | { readonly refused: string } {
  const heardPage = heardPageIn(root)
  if (typeof heardPage !== "string") return heardPage
  const read = entriesAt(root, heardPage, TRACKS, JSONL)
  if ("refused" in read) return read
  const heardIds = new Set<string>()
  const heardKeys = new Set<string>()
  for (const one of read.entries) {
    const id = textIn(one, "spotifyTrackId")
    if (id !== null) heardIds.add(id)
    const key = textIn(one, "titleKey")
    if (key !== null) heardKeys.add(key)
  }
  const playKeys = new Set<string>()
  let newestPlayedAt: string | null = null
  for (const day of valuesOfType(root, ESO_DAY)) {
    if (day.value[LISTENS] !== JSONL) continue
    const held = entriesAt(root, day.path, LISTENS, JSONL)
    if ("refused" in held) return held
    for (const one of held.entries) {
      const key = textIn(one, "playKey")
      if (key !== null) playKeys.add(key)
      const at = textIn(one, "playedAt")
      if (at !== null && (newestPlayedAt === null || at > newestPlayedAt)) newestPlayedAt = at
    }
  }
  return { heardPage, ledger: { playKeys, heardIds, heardKeys, newestPlayedAt } }
}

export function linesOver(rows: readonly Value[]): string {
  let held = ""
  for (const one of rows) held += `${JSON.stringify(one)}${NEWLINE}`
  return held
}

export function appendedOnto(was: string | null, rows: readonly Value[]): string {
  const held = was === null || was === "" ? "" : was.endsWith(NEWLINE) ? was : `${was}${NEWLINE}`
  return `${held}${linesOver(rows)}`
}

function bodied(path: string, text: string): FileEdit {
  return { path, body: new TextEncoder().encode(text) }
}

function appendedBeside(
  root: string,
  page: string,
  propertySlug: string,
  rows: readonly Value[]
): FileEdit | { readonly refused: string } {
  const at = besideAt(page, propertySlug, JSONL)
  if (at === null) {
    return {
      refused: `'${page}' is no page file, so its \`${propertySlug}\` has no name beside it`,
    }
  }
  return bodied(at, appendedOnto(textAt(join(root, at)), rows))
}

function dayValuesIn(root: string): ReadonlyMap<string, Value> {
  const held = new Map<string, Value>()
  for (const one of valuesOfType(root, ESO_DAY)) {
    const slug = textIn(one.value, "slug")
    if (slug !== null) held.set(slug, one.value)
  }
  return held
}

export function changesFor(
  root: string,
  heardPage: string,
  planned: Planned
): readonly FileEdit[] | { readonly refused: string } {
  const changes: FileEdit[] = []
  if (planned.heard.length > 0) {
    const edit = appendedBeside(root, heardPage, TRACKS, planned.heard)
    if ("refused" in edit) return edit
    changes.push(edit)
  }
  const days = dayValuesIn(root)
  for (const day of [...planned.listens.keys()].sort()) {
    const slug = `${ESO_DAY}-${day}`
    const was = days.get(slug)
    const composed = composedFor(root, {
      pageTypeSlug: ESO_DAY,
      slug,
      values: {
        title: `@${ESO_DAY}:${day}`,
        esoDay: day,
        ...(was ?? {}),
        pageTypeSlug: ESO_DAY,
        slug,
        [LISTENS]: JSONL,
      },
    })
    if ("refused" in composed) return composed
    changes.push(bodied(composed.put.path, composed.put.content))
    const edit = appendedBeside(root, composed.put.path, LISTENS, planned.listens.get(day) ?? [])
    if ("refused" in edit) return edit
    changes.push(edit)
  }
  return changes
}

export function messageFor(planned: Planned): string {
  const days = planned.listens.size
  return `file ${planned.recorded} listen(s) over ${days} ESO day(s) and ${planned.heard.length} heard track(s)`
}

export function rowsOf(planned: Planned): readonly string[] {
  const rows = [
    `fetched\t${planned.fetched}`,
    `recorded\t${planned.recorded}`,
    `already-filed\t${planned.alreadyRecorded}`,
    `first-listens\t${planned.firstListens}`,
    `new-music-minutes\t${planned.newMusicMinutes}`,
    `heard-tracks\t${planned.heard.length}`,
    `eso-days\t${planned.listens.size}`,
  ]
  if (planned.skippedUnidentified > 0) rows.push(`unidentified\t${planned.skippedUnidentified}`)
  if (planned.primed) rows.push("primed\tno play was filed before this run, so it scores none")
  return rows
}

export function jsonOf(planned: Planned): string {
  return JSON.stringify({
    fetched: planned.fetched,
    recorded: planned.recorded,
    alreadyRecorded: planned.alreadyRecorded,
    firstListens: planned.firstListens,
    newMusicMinutes: planned.newMusicMinutes,
    heardTracks: planned.heard.length,
    esoDays: [...planned.listens.keys()].sort(),
    skippedUnidentified: planned.skippedUnidentified,
    primed: planned.primed,
  })
}

export async function capturing(
  argv: readonly string[],
  given: Given,
  plays: Plays
): Promise<Answer> {
  const held = taken(argv)
  if ("refused" in held) return refused(held.refused, INPUT)
  const filed = filedIn(given.root)
  if ("refused" in filed) return refused(filed.refused, DATA)
  let page: Fetched
  try {
    page = await plays(askingFor(filed.ledger))
  } catch (thrown) {
    return refused(saidBy(thrown), OPERATIONAL)
  }
  const planned = plannedOver(page.items, filed.ledger)
  if (planned.recorded === 0) {
    return {
      report: held.json ? [jsonOf(planned)] : [...rowsOf(planned), NOTHING_NEW],
      refusals: [],
      code: 0,
    }
  }
  const changes = changesFor(given.root, filed.heardPage, planned)
  if ("refused" in changes) return refused(changes.refused, DATA)
  const answer = await landingAsked(given, {
    changes,
    message: messageFor(planned),
    dryRun: held.dryRun,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer
  return {
    report: held.json ? [jsonOf(planned)] : [...rowsOf(planned), ...answer.report],
    refusals: [],
    code: 0,
  }
}

export function musicCapture(argv: readonly string[], given: Given): Promise<Answer> {
  return capturing(argv, given, getRecentlyPlayed)
}
