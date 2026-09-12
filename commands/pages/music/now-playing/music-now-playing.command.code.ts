import {
  getCurrentlyPlaying,
  getPlaybackState,
} from "akasha/alan/music/spotify/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { OK, refusedBy } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { musicNowPlaying as page } from "akasha/commands/pages/music/now-playing/music-now-playing.command.ts"

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
  argv: readonly string[],
  calledAs: string
): Promise<Answer> {
  const taking = takenFor(argv, calledAs, page, [json])
  if ("refused" in taking) return refusedBy(taking.refused)
  const [state, current] = await Promise.all([read.getPlaybackState(), read.getCurrentlyPlaying()])
  const envelope = envelopeOf(state, current)
  const report = taking.taken.json ? [JSON.stringify(envelope)] : [lineOf(envelope)]
  return { report, refusals: [], code: OK }
}

export function musicNowPlaying(argv: readonly string[], given: Given): Promise<Answer> {
  return nowPlayingWith({ getPlaybackState, getCurrentlyPlaying }, argv, given.calledAs)
}
