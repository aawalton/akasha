import { InputError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import type { ResolvedTrack } from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import {
  resolveDeviceId,
  resolveQueryToTrack,
} from "akasha/alan/music/choosing/track-resolving/track-resolving.module.code.ts"
import {
  addToQueue,
  startResumePlayback,
} from "akasha/alan/music/spotify/player/spotify-player.module.code.ts"
import {
  answering,
  INPUT,
  OK,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import type { Read, Starting } from "akasha/commands/pages/music/play/music-play.command.code.ts"
import {
  ARTIST,
  DEVICE_ID,
  JSON_FLAG,
  readingArgv,
  startedOn,
} from "akasha/commands/pages/music/play/music-play.command.code.ts"

const TAKING_VALUE: readonly string[] = [ARTIST, DEVICE_ID]

const TAKING_NONE: readonly string[] = [JSON_FLAG]

const NO_QUERY = "supply at least one track query to queue"

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

export const QUEUEING: Queueing = {
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

export function queueEnvelopeFor(
  queries: readonly string[],
  tracks: readonly ResolvedTrack[],
  deviceId: string | undefined
): QueueEnvelope {
  return { queries, tracks, deviceId: deviceId ?? null }
}

export function trackLabelFor(track: ResolvedTrack): string {
  const label = track.name ?? track.uri
  const suffix = track.artists.length > 0 ? ` — ${track.artists.join(", ")}` : ""
  return `${label}${suffix}`
}

export function playingLineFor(track: ResolvedTrack): string {
  return `▶ Playing "${trackLabelFor(track)}"`
}

export function queuedLineFor(track: ResolvedTrack): string {
  return `  + queued "${trackLabelFor(track)}"`
}

export function queueLinesFor(tracks: readonly ResolvedTrack[]): readonly string[] {
  const [first, ...rest] = tracks
  if (first === undefined) return []
  return [playingLineFor(first), ...rest.map(queuedLineFor)]
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
  if (first === undefined) throw new InputError(NO_QUERY)
  const deviceId = await startedOn(first.uri, deviceNamed, ports)
  done.push(playingLineFor(first))
  const deviceOption = deviceId !== undefined ? { deviceId } : {}
  for (const track of rest) {
    await ports.addToQueue(track.uri, deviceOption)
    done.push(queuedLineFor(track))
  }
  return deviceId
}

async function queued(read: Read, ports: Queueing, done: string[]): Promise<Answer> {
  const queries = read.positionals
  if (queries.length === 0) throw new InputError(NO_QUERY)
  const tracks = await resolvedFor(queries, read.valued.get(ARTIST), ports)
  const deviceId = await playedAndQueued(tracks, read.valued.get(DEVICE_ID), ports, done)
  const said = read.bare.has(JSON_FLAG)
    ? [JSON.stringify(queueEnvelopeFor(queries, tracks, deviceId))]
    : [...done]
  return { report: said, refusals: [], code: OK }
}

export async function queueing(argv: readonly string[], ports: Queueing): Promise<Answer> {
  const read = readingArgv(argv, TAKING_VALUE, TAKING_NONE)
  if ("mistaken" in read) return refused(read.mistaken, INPUT)
  return await answering(async (done) => await queued(read, ports, done))
}

export function musicQueue(argv: readonly string[] = []): Promise<Answer> {
  return queueing(argv, QUEUEING)
}
