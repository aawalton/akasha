import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { InputError, isCliError } from "@akasha/errors-core/exit-code"
import type { ResolvableTrack, ResolvedTrack } from "@akasha/music-choosing/track-resolving"
import {
  parseTrackId,
  resolveDeviceId,
  resolveQueryToTrack,
  trackToResolved,
} from "@akasha/music-choosing/track-resolving"
import { startResumePlayback } from "@akasha/spotify/player"
import { getTrack } from "@akasha/spotify/tracks"

const INPUT = 1

export const URI = "--uri"

export const ARTIST = "--artist"

export const DEVICE_ID = "--device-id"

export const JSON_FLAG = "--json"

const TAKING_VALUE: readonly string[] = [URI, ARTIST, DEVICE_ID]

const TAKING_NONE: readonly string[] = [JSON_FLAG]

const NO_QUERY = "supply a track query to play, or --uri to play an exact track"

const QUERY_TOO = "--uri plays an exact track; do not also pass a query"

export type Read = {
  readonly valued: ReadonlyMap<string, string>
  readonly bare: ReadonlySet<string>
  readonly positionals: readonly string[]
}

export type Mistaken = {
  readonly mistaken: string
}

export function readingArgv(
  argv: readonly string[],
  takingValue: readonly string[],
  takingNone: readonly string[]
): Read | Mistaken {
  const valued = new Map<string, string>()
  const bare = new Set<string>()
  const positionals: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const token = argv[at]
    if (token === undefined) break
    if (token === "--") {
      positionals.push(...argv.slice(at + 1))
      break
    }
    if (!token.startsWith("--")) {
      positionals.push(token)
      continue
    }
    const equals = token.indexOf("=")
    const name = equals >= 0 ? token.slice(0, equals) : token
    const inline = equals >= 0 ? token.slice(equals + 1) : undefined
    if (takingValue.includes(name)) {
      let value = inline
      if (value === undefined) {
        at += 1
        value = argv[at]
        if (value === undefined) return { mistaken: `${name} requires a value` }
      }
      if (valued.has(name)) return { mistaken: `${name}: flag given more than once` }
      valued.set(name, value)
      continue
    }
    if (takingNone.includes(name)) {
      if (inline !== undefined) return { mistaken: `${name}: flag does not accept a value` }
      if (bare.has(name)) return { mistaken: `${name}: flag given more than once` }
      bare.add(name)
      continue
    }
    return { mistaken: `unknown flag: ${name}` }
  }
  return { valued, bare, positionals }
}

export type StartResumeOptions = {
  readonly uris: readonly string[]
  readonly deviceId?: string
}

export type Starting = {
  readonly resolveDeviceId: (said: string | undefined) => Promise<string | undefined>
  readonly startResumePlayback: (options: StartResumeOptions) => Promise<void>
}

export function startResumeOptionsFor(
  uri: string,
  deviceId: string | undefined
): StartResumeOptions {
  return { uris: [uri], ...(deviceId !== undefined && { deviceId }) }
}

export async function startedOn(
  uri: string,
  named: string | undefined,
  starting: Starting
): Promise<string | undefined> {
  const deviceId = await starting.resolveDeviceId(named)
  await starting.startResumePlayback(startResumeOptionsFor(uri, deviceId))
  return deviceId
}

export type Playing = Starting & {
  readonly parseTrackId: (uri: string) => string | null
  readonly getTrack: (id: string) => Promise<ResolvableTrack>
  readonly trackToResolved: (uri: string, track: ResolvableTrack) => ResolvedTrack
  readonly resolveQueryToTrack: (
    query: string,
    artist: string | undefined
  ) => Promise<ResolvedTrack>
}

export const PLAYING: Playing = {
  parseTrackId,
  getTrack,
  trackToResolved,
  resolveQueryToTrack,
  resolveDeviceId,
  startResumePlayback,
}

export type PlayEnvelope = {
  readonly query: string | null
  readonly track: ResolvedTrack
  readonly deviceId: string | null
}

export function playEnvelopeFor(
  query: string | null,
  track: ResolvedTrack,
  deviceId: string | undefined
): PlayEnvelope {
  return { query, track, deviceId: deviceId ?? null }
}

export function playLineFor(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `▶ Playing "${label}"${suffix}`
}

function wrongIn(read: Read): string | null {
  if (read.valued.has(URI) && read.valued.has(ARTIST)) {
    return `mutually exclusive flags given together: ${URI}, ${ARTIST}`
  }
  const extra = read.positionals.slice(1)
  if (extra.length > 0) return `unexpected positional argument(s): ${extra.join(" ")}`
  return null
}

type Wanted = {
  readonly query: string | null
  readonly track: ResolvedTrack
}

async function wantedIn(read: Read, ports: Playing): Promise<Wanted> {
  const query = read.positionals[0]
  const uri = read.valued.get(URI)
  if (uri !== undefined && uri !== "") {
    if (query !== undefined && query !== "") throw new InputError(QUERY_TOO)
    const trackId = ports.parseTrackId(uri)
    if (trackId === null) {
      return { query: null, track: { name: null, uri, id: null, artists: [] } }
    }
    return { query: null, track: ports.trackToResolved(uri, await ports.getTrack(trackId)) }
  }
  if (query === undefined || query === "") throw new InputError(NO_QUERY)
  return { query, track: await ports.resolveQueryToTrack(query, read.valued.get(ARTIST)) }
}

export async function playing(argv: readonly string[], ports: Playing): Promise<Answer> {
  const read = readingArgv(argv, TAKING_VALUE, TAKING_NONE)
  if ("mistaken" in read) return refused(read.mistaken, INPUT)
  const wrong = wrongIn(read)
  if (wrong !== null) return refused(wrong, INPUT)
  try {
    const wanted = await wantedIn(read, ports)
    const deviceId = await startedOn(wanted.track.uri, read.valued.get(DEVICE_ID), ports)
    const said = read.bare.has(JSON_FLAG)
      ? JSON.stringify(playEnvelopeFor(wanted.query, wanted.track, deviceId))
      : playLineFor(wanted.track)
    return { report: [said], refusals: [], code: 0 }
  } catch (thrown) {
    if (isCliError(thrown)) return refused(thrown.message, thrown.code)
    throw thrown
  }
}

export function musicPlay(argv: readonly string[] = []): Promise<Answer> {
  return playing(argv, PLAYING)
}
