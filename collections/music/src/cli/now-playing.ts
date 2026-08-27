import type {
  getCurrentlyPlaying,
  getPlaybackState,
} from "@collections/music-spotify/endpoints/player"

type PlaybackState = NonNullable<Awaited<ReturnType<typeof getPlaybackState>>>
type CurrentlyPlaying = NonNullable<Awaited<ReturnType<typeof getCurrentlyPlaying>>>

export interface NowPlayingTrack {
  readonly name: string
  readonly uri: string
  readonly id: string | null
  readonly duration_ms: number | null
}

export type NowPlayingEnvelope =
  | { readonly activeDevice: false; readonly track: null }
  | {
      readonly activeDevice: true
      readonly isPlaying: boolean
      readonly device: string
      readonly progress_ms: number | null
      readonly track: NowPlayingTrack | null
    }

export function buildNowPlayingEnvelope(
  state: PlaybackState | null,
  current: CurrentlyPlaying | null
): NowPlayingEnvelope {
  if (state === null) {
    return { activeDevice: false, track: null }
  }
  const item = current?.item ?? state.item
  const track: NowPlayingTrack | null =
    item === null || item === undefined
      ? null
      : { name: item.name, uri: item.uri, id: item.id, duration_ms: item.duration_ms ?? null }
  return {
    activeDevice: true,
    isPlaying: state.is_playing,
    device: state.device.name,
    progress_ms: current?.progress_ms ?? state.progress_ms,
    track,
  }
}
