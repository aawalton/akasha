import type { NowPlayingEnvelope } from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"
import type {
  PlayedItem,
  PlayedReader,
} from "akasha/command/pages/music/rate/modules/track-naming/track-naming.module.code.ts"

export const TRACK_SLUG = "alexandria-always-an-angel-always-an-angel"

export const PLAYING_ID = "5CziXblfbYNLB4dELQrgq4"

export const PLAYING_TITLE = "Always an Angel"

export const SUN_ID = "5Uf5kobSFxwPZYlqAc4y7F"

export const SUN_TITLE = "Here Comes the Sun"

export const LENGTH_MS = 116250

export function finding(externalId: string): string | null {
  return externalId === PLAYING_ID ? TRACK_SLUG : null
}

export function itemsOf(
  tracks: readonly { readonly id: string | null; readonly name: string }[]
): readonly PlayedItem[] {
  return tracks.map((track) => ({ track }))
}

function historyOf(
  tracks: readonly { readonly id: string | null; readonly name: string }[]
): PlayedReader {
  const items = itemsOf(tracks)
  return async () => ({ items })
}

export const PLAYED = historyOf([{ id: PLAYING_ID, name: PLAYING_TITLE }])

export function playing(
  id: string | null,
  name: string,
  isPlaying: boolean = true
): NowPlayingEnvelope {
  return {
    activeDevice: true,
    isPlaying,
    device: "the study",
    progress_ms: 1000,
    track: id === null ? null : { name, uri: `spotify:track:${id}`, id, duration_ms: LENGTH_MS },
  }
}
