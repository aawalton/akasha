import type {
  ResolvableTrack,
  ResolvedTrack,
} from "akasha/alan/music/choosing/modules/track-resolving/track-resolving.module.code.ts"
import {
  parseTrackId,
  resolveDeviceId,
  resolveQueryToTrack,
  trackToResolved,
} from "akasha/alan/music/choosing/modules/track-resolving/track-resolving.module.code.ts"
import { startResumePlayback } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { getTrack } from "akasha/alan/music/spotify/modules/tracks/spotify-tracks.module.code.ts"
import { isCliError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { artist as artistArgument } from "akasha/command/argument/pages/artist.argument.ts"
import { deviceId as deviceIdArgument } from "akasha/command/argument/pages/device-id.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { query as queryArgument } from "akasha/command/argument/pages/query.argument.ts"
import { uri as uriArgument } from "akasha/command/argument/pages/uri.argument.ts"
import {
  answering,
  INPUT,
  keeping,
  refused,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicPlay as page } from "akasha/command/pages/music/play/music-play.command.ts"

const NAMED = [artistArgument, deviceIdArgument, json, queryArgument, uriArgument]

export type StartResumeOptions = {
  readonly contextUri?: string
  readonly uris?: readonly string[]
  readonly deviceId?: string
}

export type Starting = {
  readonly resolveDeviceId: (said: string | undefined) => Promise<string | undefined>
  readonly startResumePlayback: (options: StartResumeOptions) => Promise<void>
}

const CONTEXT_KINDS = ["playlist", "album", "artist"]

function playedAs(uri: string): StartResumeOptions {
  const kind = uri.split(":")[1] ?? ""
  return CONTEXT_KINDS.includes(kind) ? { contextUri: uri } : { uris: [uri] }
}

function startResumeOptionsFor(uri: string, deviceId: string | undefined): StartResumeOptions {
  return { ...playedAs(uri), ...(deviceId !== undefined && { deviceId }) }
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

const PLAYING: Playing = {
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

function playEnvelopeFor(
  query: string | null,
  track: ResolvedTrack,
  deviceId: string | undefined
): PlayEnvelope {
  return { query, track, deviceId: deviceId ?? null }
}

function startedSaid(uri: string, deviceId: string | undefined): string {
  const where = deviceId === undefined ? "the active device" : `device ${deviceId}`
  return `${uri} was started on ${where}`
}

function playLineFor(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `▶ Playing "${label}"${suffix}`
}

function wrongIn(said: string | undefined, named: string | undefined): string | null {
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
  const query = said ?? ""
  return { query, track: await ports.resolveQueryToTrack(query, by) }
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
      return told([said])
    } catch (thrown) {
      if (isCliError(thrown)) return keeping(done, refused(thrown.message, thrown.code))
      throw thrown
    }
  })
}

export function musicPlay(argv: readonly string[], given: Given): Promise<Answer> {
  return playing(argv, PLAYING, given.calledAs)
}
