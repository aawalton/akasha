import type { TimeRange } from "akasha/alan/music/spotify/personalization/spotify-personalization.module.code.ts"
import {
  getTopArtists,
  getTopTracks,
  TIME_RANGES,
} from "akasha/alan/music/spotify/personalization/spotify-personalization.module.code.ts"
import {
  getCurrentlyPlaying,
  getRecentlyPlayed,
} from "akasha/alan/music/spotify/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit as limitArgument } from "akasha/commands/arguments/pages/limit.argument.ts"
import { window as windowArgument } from "akasha/commands/arguments/pages/window.argument.ts"
import {
  INPUT,
  OK,
  refused,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { musicListening as page } from "akasha/commands/pages/music/listening/music-listening.command.ts"

const NAMED = [json, limitArgument, windowArgument]

const DEFAULT_LIMIT = 10

const MAX_RECENTLY_PLAYED = 50

const TERM = "_term"

type Playing = {
  readonly item?: { readonly name: string } | null
  readonly is_playing?: boolean
}

type Played = {
  readonly track: { readonly name: string }
  readonly played_at: string
}

type TopArtist = {
  readonly name: string
}

type TopTrack = {
  readonly name: string
  readonly artists?: readonly { readonly name: string }[]
}

export type Listening = {
  readonly window: TimeRange
  readonly limit: number
  readonly currentlyPlaying: Playing | null
  readonly recentlyPlayed: readonly Played[]
  readonly topArtists: readonly TopArtist[]
  readonly topTracks: readonly TopTrack[]
}

export function windowOf(said: string | undefined): TimeRange | null {
  if (said === undefined || said === "") return "medium_term"
  const held = said.endsWith(TERM) ? said : `${said}${TERM}`
  return TIME_RANGES.find((one) => one === held) ?? null
}

function joined(artists: readonly { readonly name: string }[] | undefined): string {
  if (artists === undefined || artists.length === 0) return ""
  return artists.map((one) => one.name).join(", ")
}

export function saidOf(data: Listening): readonly string[] {
  const lines: string[] = []

  const playing = data.currentlyPlaying?.item?.name
  if (playing === undefined) {
    lines.push("Currently playing: (nothing)")
  } else {
    const state = data.currentlyPlaying?.is_playing === true ? "playing" : "paused"
    lines.push(`Currently playing: ${playing} (${state})`)
  }

  lines.push("", `Recently played (${data.recentlyPlayed.length}):`)
  for (const [at, one] of data.recentlyPlayed.entries()) {
    lines.push(`  ${at + 1}. ${one.track.name}  · ${one.played_at}`)
  }

  lines.push("", `Top artists (${data.window}, ${data.topArtists.length}):`)
  for (const [at, one] of data.topArtists.entries()) {
    lines.push(`  ${at + 1}. ${one.name}`)
  }

  lines.push("", `Top tracks (${data.window}, ${data.topTracks.length}):`)
  for (const [at, one] of data.topTracks.entries()) {
    const by = joined(one.artists)
    lines.push(by === "" ? `  ${at + 1}. ${one.name}` : `  ${at + 1}. ${one.name} — ${by}`)
  }

  return lines
}

export async function musicListening(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken

  const windowSaid = taken.window
  const window = windowOf(windowSaid)
  if (window === null) {
    return refused(
      `unknown ${windowArgument.said} "${windowSaid ?? ""}" (expected one of: short, medium, long)`,
      INPUT
    )
  }

  const counted = taken.limit ?? DEFAULT_LIMIT
  const limit = counted === 0 ? DEFAULT_LIMIT : counted

  const [currentlyPlaying, recently, topArtists, topTracks] = await Promise.all([
    getCurrentlyPlaying(),
    getRecentlyPlayed({ limit: Math.min(limit, MAX_RECENTLY_PLAYED) }),
    getTopArtists(window),
    getTopTracks(window),
  ])

  const data: Listening = {
    window,
    limit,
    currentlyPlaying,
    recentlyPlayed: recently.items.slice(0, limit),
    topArtists: topArtists.slice(0, limit),
    topTracks: topTracks.slice(0, limit),
  }

  return {
    report: taken.json ? [JSON.stringify(data)] : [...saidOf(data)],
    refusals: [],
    code: OK,
  }
}
