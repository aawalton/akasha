import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { TimeRange } from "@akasha/spotify/personalization"
import { getTopArtists, getTopTracks, TIME_RANGES } from "@akasha/spotify/personalization"
import { getCurrentlyPlaying, getRecentlyPlayed } from "@akasha/spotify/player"

const INPUT = 1

const WINDOW = "--window"

const LIMIT = "--limit"

const JSON_SAID = "--json"

const VALUED: readonly string[] = [WINDOW, LIMIT]

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

type Told = {
  readonly named: Record<string, string>
  readonly flags: readonly string[]
}

function told(argv: readonly string[]): Told | string {
  const named: Record<string, string> = {}
  const flags: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] as string
    const split = one.indexOf("=")
    const said = split < 0 ? one : one.slice(0, split)
    if (VALUED.includes(said)) {
      const value = split < 0 ? argv[at + 1] : one.slice(split + 1)
      if (value === undefined) return `\`${said}\` was said with nothing after it`
      named[said] = value
      if (split < 0) at += 1
      continue
    }
    if (one === JSON_SAID) {
      flags.push(one)
      continue
    }
    return `\`${one}\` is nothing \`akasha music-listening\` takes`
  }
  return { named, flags }
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

export async function musicListening(argv: readonly string[]): Promise<Answer> {
  const read = told(argv)
  if (typeof read === "string") return refused(read, INPUT)

  const windowSaid = read.named[WINDOW]
  const window = windowOf(windowSaid)
  if (window === null) {
    return refused(
      `unknown ${WINDOW} "${windowSaid ?? ""}" (expected one of: short, medium, long)`,
      INPUT
    )
  }

  const limitSaid = read.named[LIMIT]
  const counted = limitSaid === undefined ? DEFAULT_LIMIT : Number(limitSaid)
  if (!Number.isInteger(counted) || counted < 0) {
    return refused(`${LIMIT} must be a non-negative integer, got: ${limitSaid ?? ""}`, INPUT)
  }
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
    report: read.flags.includes(JSON_SAID) ? [JSON.stringify(data)] : [...saidOf(data)],
    refusals: [],
    code: 0,
  }
}
