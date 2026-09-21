import type { NowPlayingEnvelope } from "akasha/command/pages/music/now-playing/music-now-playing.command.code.ts"

export const TRACK_SLUG = "alexandria-always-an-angel-always-an-angel"

export const PLAYING_ID = "5CziXblfbYNLB4dELQrgq4"

export const PLAYING_TITLE = "Always an Angel"

export const LENGTH_MS = 116250

export function finding(externalId: string): string | null {
  return externalId === PLAYING_ID ? TRACK_SLUG : null
}

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
