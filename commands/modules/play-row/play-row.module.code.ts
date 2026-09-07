import { getEsoDayStr } from "@akasha/day/eso-day"

const MS_PER_MINUTE = 60_000

const MINUTE_PRECISION = 3

const UNSAID = /[^a-z0-9]/g

export type PlayInput = {
  readonly trackId: string
  readonly trackName: string
  readonly artistName: string
  readonly playedAt: string
  readonly durationMs: number | undefined
}

export type PlayRow = {
  readonly playedAt: string
  readonly playKey: string
  readonly spotifyTrackId: string
  readonly trackName: string
  readonly artistName: string
  readonly minutes: number
  readonly firstListen: boolean
  readonly newMusicMinutes: number
}

export function minutesOf(durationMs: number | undefined): number {
  if (typeof durationMs !== "number" || !Number.isFinite(durationMs) || durationMs <= 0) return 0
  return Number((durationMs / MS_PER_MINUTE).toFixed(MINUTE_PRECISION))
}

export function playKeyOf(trackId: string, playedAt: string): string {
  return `${trackId}@${playedAt}`
}

export function esoDayOfPlay(playedAt: string): string {
  return getEsoDayStr(new Date(playedAt))
}

function narrowed(value: string): string {
  return value.toLowerCase().replace(UNSAID, "")
}

export function heardKeyOf(trackName: string, artistName: string): string {
  const title = narrowed(trackName)
  const artist = narrowed(artistName)
  return artist === "" ? title : `${title}|${artist}`
}

export function isFirstListen(priming: boolean, ledgerAlreadyHadIt: boolean): boolean {
  if (priming) return false
  return !ledgerAlreadyHadIt
}

export function newMusicMinutesOf(minutes: number, firstListen: boolean): number {
  return firstListen ? minutes : 0
}

export function buildPlayRow(play: PlayInput, firstListen: boolean): PlayRow {
  const minutes = minutesOf(play.durationMs)
  return {
    playedAt: play.playedAt,
    playKey: playKeyOf(play.trackId, play.playedAt),
    spotifyTrackId: play.trackId,
    trackName: play.trackName,
    artistName: play.artistName,
    minutes,
    firstListen,
    newMusicMinutes: newMusicMinutesOf(minutes, firstListen),
  }
}

export function resumeCursorMs(newestStoredPlayedAt: string | null): number | undefined {
  if (newestStoredPlayedAt === null) return undefined
  const ms = new Date(newestStoredPlayedAt).getTime()
  return Number.isFinite(ms) ? ms + 1 : undefined
}

export function sumNewMusicMinutes(rows: readonly { readonly newMusicMinutes: number }[]): number {
  let total = 0
  for (const row of rows) total += row.newMusicMinutes
  return Number(total.toFixed(MINUTE_PRECISION))
}
