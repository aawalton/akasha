import type { ResolvedTrack } from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import {
  resolveDeviceId,
  resolveQueryToTrack,
} from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import {
  addToQueue,
  startResumePlayback,
} from "akasha/alan/music/spotify/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { artist as artistArgument } from "akasha/commands/arguments/pages/artist.argument.ts"
import { deviceId as deviceIdArgument } from "akasha/commands/arguments/pages/device-id.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { query as queryArgument } from "akasha/commands/arguments/pages/query.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Starting } from "akasha/commands/pages/music/play/music-play.command.code.ts"
import { startedOn } from "akasha/commands/pages/music/play/music-play.command.code.ts"
import { musicQueue as page } from "akasha/commands/pages/music/queue/music-queue.command.ts"

const NAMED = [artistArgument, deviceIdArgument, json, queryArgument]

type Said = {
  readonly queries: readonly string[]
  readonly artist: string | undefined
  readonly deviceId: string | undefined
  readonly json: boolean
}

export type DeviceOption = {
  readonly deviceId?: string
}

export type Queueing = Starting & {
  readonly resolveQueryToTrack: (
    query: string,
    artist: string | undefined
  ) => Promise<ResolvedTrack>
  readonly addToQueue: (uri: string, options: DeviceOption) => Promise<void>
}

const QUEUEING: Queueing = {
  resolveQueryToTrack,
  resolveDeviceId,
  startResumePlayback,
  addToQueue,
}

export type QueueEnvelope = {
  readonly queries: readonly string[]
  readonly tracks: readonly ResolvedTrack[]
  readonly deviceId: string | null
}

function queueEnvelopeFor(
  queries: readonly string[],
  tracks: readonly ResolvedTrack[],
  deviceId: string | undefined
): QueueEnvelope {
  return { queries, tracks, deviceId: deviceId ?? null }
}

function trackLabelFor(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `${label}${suffix}`
}

function playingLineFor(track: ResolvedTrack): string {
  return `▶ Playing "${trackLabelFor(track)}"`
}

function queuedLineFor(track: ResolvedTrack): string {
  return `  + queued "${trackLabelFor(track)}"`
}

async function resolvedFor(
  queries: readonly string[],
  artist: string | undefined,
  ports: Queueing
): Promise<readonly ResolvedTrack[]> {
  const tracks: ResolvedTrack[] = []
  for (const query of queries) {
    tracks.push(await ports.resolveQueryToTrack(query, artist))
  }
  return tracks
}

export async function playedAndQueued(
  tracks: readonly ResolvedTrack[],
  deviceNamed: string | undefined,
  ports: Queueing,
  done: string[]
): Promise<string | undefined> {
  const [first, ...rest] = tracks
  if (first === undefined) return undefined
  const deviceId = await startedOn(first.uri, deviceNamed, ports)
  done.push(playingLineFor(first))
  const deviceOption = deviceId !== undefined ? { deviceId } : {}
  for (const track of rest) {
    await ports.addToQueue(track.uri, deviceOption)
    done.push(queuedLineFor(track))
  }
  return deviceId
}

async function queued(said: Said, ports: Queueing, done: string[]): Promise<Answer> {
  const queries = said.queries
  const tracks = await resolvedFor(queries, said.artist, ports)
  const deviceId = await playedAndQueued(tracks, said.deviceId, ports, done)
  return told(said.json ? [JSON.stringify(queueEnvelopeFor(queries, tracks, deviceId))] : [...done])
}

export async function queueing(
  argv: readonly string[],
  ports: Queueing,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  const said: Said = {
    queries: taken.query,
    artist: taken.artist,
    deviceId: taken.deviceId,
    json: taken.json,
  }
  return await answering(async (done) => await queued(said, ports, done))
}

export function musicQueue(argv: readonly string[], given: Given): Promise<Answer> {
  return queueing(argv, QUEUEING, given.calledAs)
}
