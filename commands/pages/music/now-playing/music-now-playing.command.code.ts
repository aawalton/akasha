import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { getCurrentlyPlaying, getPlaybackState } from "@akasha/spotify/player"

const INPUT = 1

const JSON_SAID = "--json"

const PLAYING = "▶"

const HELD = "⏸"

const NO_DEVICE = "No active Spotify device"

const NOTHING = "(nothing)"

export type NowPlayingItem = {
  readonly name: string
  readonly uri: string
  readonly id: string | null
  readonly duration_ms?: number | null
}

export type NowPlayingState = {
  readonly is_playing: boolean
  readonly device: { readonly name: string }
  readonly progress_ms: number | null
  readonly item?: NowPlayingItem | null
}

export type NowPlayingCurrent = {
  readonly item?: NowPlayingItem | null
  readonly progress_ms?: number | null
}

export type NowPlayingTrack = {
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

export type NowPlayingReader = {
  readonly getPlaybackState: () => Promise<NowPlayingState | null>
  readonly getCurrentlyPlaying: () => Promise<NowPlayingCurrent | null>
}

export function envelopeOf(
  state: NowPlayingState | null,
  current: NowPlayingCurrent | null
): NowPlayingEnvelope {
  if (state === null) return { activeDevice: false, track: null }
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

export function lineOf(envelope: NowPlayingEnvelope): string {
  if (!envelope.activeDevice) return NO_DEVICE
  const mark = envelope.isPlaying ? PLAYING : HELD
  return `${mark} ${envelope.track?.name ?? NOTHING} · ${envelope.device}`
}

export async function nowPlayingWith(
  read: NowPlayingReader,
  argv: readonly string[]
): Promise<Answer> {
  for (const one of argv) {
    if (one !== JSON_SAID) {
      return refused(`\`${one}\` is nothing \`akasha music-now-playing\` takes`, INPUT)
    }
  }
  const [state, current] = await Promise.all([read.getPlaybackState(), read.getCurrentlyPlaying()])
  const envelope = envelopeOf(state, current)
  const report = argv.includes(JSON_SAID) ? [JSON.stringify(envelope)] : [lineOf(envelope)]
  return { report, refusals: [], code: 0 }
}

export function musicNowPlaying(argv: readonly string[] = []): Promise<Answer> {
  return nowPlayingWith({ getPlaybackState, getCurrentlyPlaying }, argv)
}
