import { nowPlaying } from "akasha/command/argument/pages/now-playing.argument.ts"
import { carriedIdsIn } from "akasha/command/pages/music/heard-tracks/music-heard-tracks.command.code.ts"
import type { NowPlayingEnvelope } from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"
import {
  textIn,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PLAYING = nowPlaying.said

const NO_DEVICE = `no Spotify device is active, so nothing is playing for \`${PLAYING}\` to grade`

const NOT_PLAYING = `Spotify names no track playing, so nothing is there for \`${PLAYING}\` to grade`

export type Refusal = { readonly refused: string }

export type Finding = (externalId: string) => string | null

export function slugCarried(tracks: readonly Value[], externalId: string): string | null {
  for (const one of tracks) {
    if (carriedIdsIn(one).includes(externalId)) return textIn(one, "slug")
  }
  return null
}

export function playingNamed(found: Finding, envelope: NowPlayingEnvelope): string | Refusal {
  if (!envelope.activeDevice) return { refused: NO_DEVICE }
  const track = envelope.track
  if (track === null || track.id === null) return { refused: NOT_PLAYING }
  const slug = found(track.id)
  if (slug !== null) return slug
  return {
    refused: `no track page carries the Spotify id \`${track.id}\`, which Spotify is playing as \`${track.name}\``,
  }
}
