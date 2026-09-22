import { justPlayed } from "akasha/command/argument/pages/just-played.argument.ts"
import { nowPlaying } from "akasha/command/argument/pages/now-playing.argument.ts"
import { carriedIdsIn } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import type { NowPlayingEnvelope } from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PLAYING = nowPlaying.said

const JUST_PLAYED = justPlayed.said

const IS_PLAYING = "is playing"

const PLAYED_LAST = "played last"

const NO_DEVICE = `no Spotify device is active, so nothing is playing for \`${PLAYING}\` to grade`

const NOT_PLAYING = `Spotify names no track playing, so nothing is there for \`${PLAYING}\` to grade`

const NOTHING_PLAYED = `Spotify names no track played last, so nothing is there for \`${JUST_PLAYED}\` to grade`

export type Refusal = { readonly refused: string }

export type Finding = (externalId: string) => string | null

export type PlayedItem = {
  readonly track: { readonly name: string; readonly id: string | null }
}

export type PlayedReader = () => Promise<{ readonly items: readonly PlayedItem[] }>

export function slugCarried(tracks: readonly Value[], externalId: string): string | null {
  for (const one of tracks) {
    if (carriedIdsIn(one).includes(externalId)) return textIn(one, "slug")
  }
  return null
}

function trackNamed(found: Finding, id: string, name: string, heard: string): string | Refusal {
  const slug = found(id)
  if (slug !== null) return slug
  return {
    refused: `no track page carries the Spotify id \`${id}\`, which Spotify ${heard} as \`${name}\``,
  }
}

export function playingNamed(found: Finding, envelope: NowPlayingEnvelope): string | Refusal {
  if (!envelope.activeDevice) return { refused: NO_DEVICE }
  const track = envelope.track
  if (track === null || track.id === null) return { refused: NOT_PLAYING }
  return trackNamed(found, track.id, track.name, IS_PLAYING)
}

export function playingIdOf(envelope: NowPlayingEnvelope): string | null {
  return envelope.track?.id ?? null
}

function heardBefore(
  items: readonly PlayedItem[],
  playingId: string | null
): PlayedItem | undefined {
  if (playingId === null) return items[0]
  return items.find((one) => one.track.id !== playingId)
}

export function justPlayedNamed(
  found: Finding,
  items: readonly PlayedItem[],
  playingId: string | null
): string | Refusal {
  const track = heardBefore(items, playingId)?.track
  if (track === undefined || track.id === null) return { refused: NOTHING_PLAYED }
  return trackNamed(found, track.id, track.name, PLAYED_LAST)
}
