import {
  InputError,
  isCliError,
} from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type {
  ResolvableTrack,
  ResolvedTrack,
} from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import {
  parseTrackId,
  resolveDeviceId,
  resolveQueryToTrack,
  trackToResolved,
} from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import { startResumePlayback } from "akasha/alan/music/spotify/player/spotify-player.module.code.ts"
import { getTrack } from "akasha/alan/music/spotify/tracks/spotify-tracks.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { artist as artistArgument } from "akasha/commands/arguments/pages/artist.argument.ts"
import { deviceId as deviceIdArgument } from "akasha/commands/arguments/pages/device-id.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { query as queryArgument } from "akasha/commands/arguments/pages/query.argument.ts"
import { uri as uriArgument } from "akasha/commands/arguments/pages/uri.argument.ts"
import {
  answering,
  INPUT,
  keeping,
  OK,
  refused,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { musicPlay as page } from "akasha/commands/pages/music/play/music-play.command.ts"

const NAMED = [artistArgument, deviceIdArgument, json, queryArgument, uriArgument]

const NO_QUERY = "supply a track query to play, or --uri to play an exact track"

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

export function startedSaid(uri: string, deviceId: string | undefined): string {
  const where = deviceId === undefined ? "the active device" : `device ${deviceId}`
  return `${uri} was started on ${where}`
}

export function playLineFor(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `▶ Playing "${label}"${suffix}`
}

export function wrongIn(said: string | undefined, named: string | undefined): string | null {
  if (named === "") return `\`${uriArgument.said}\` takes a track uri, and an empty one came`
  if (said === "")
    return `\`<${queryArgument.placeholder}>\` takes a name to search for, and an empty one came`
  return null
}

type Wanted = {
  readonly query: string | null
  readonly track: ResolvedTrack
}

async function wantedIn(
  said: string | undefined,
  named: string | undefined,
  by: string | undefined,
  ports: Playing
): Promise<Wanted> {
  if (named !== undefined && named !== "") {
    const trackId = ports.parseTrackId(named)
    if (trackId === null) {
      return { query: null, track: { name: null, uri: named, id: null, artists: [] } }
    }
    return { query: null, track: ports.trackToResolved(named, await ports.getTrack(trackId)) }
  }
  if (said === undefined) throw new InputError(NO_QUERY)
  return { query: said, track: await ports.resolveQueryToTrack(said, by) }
}

export async function playing(
  argv: readonly string[],
  ports: Playing,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const wrong = wrongIn(taken.query, taken.uri)
  if (wrong !== null) return refused(wrong, INPUT)
  return await answering(async (done) => {
    try {
      const wanted = await wantedIn(taken.query, taken.uri, taken.artist, ports)
      const deviceId = await startedOn(wanted.track.uri, taken.deviceId, ports)
      done.push(startedSaid(wanted.track.uri, deviceId))
      const said = taken.json
        ? JSON.stringify(playEnvelopeFor(wanted.query, wanted.track, deviceId))
        : playLineFor(wanted.track)
      return { report: [said], refusals: [], code: OK }
    } catch (thrown) {
      if (isCliError(thrown)) return keeping(done, refused(thrown.message, thrown.code))
      throw thrown
    }
  })
}

export function musicPlay(argv: readonly string[], given: Given): Promise<Answer> {
  return playing(argv, PLAYING, given.calledAs)
}
