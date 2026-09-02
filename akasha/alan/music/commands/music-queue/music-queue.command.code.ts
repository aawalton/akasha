import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { InputError, isCliError } from "@akasha/errors-core/exit-code"
import type { ResolvedTrack } from "@akasha/music-choosing/track-resolving"
import { resolveDeviceId, resolveQueryToTrack } from "@akasha/music-choosing/track-resolving"
import { addToQueue, startResumePlayback } from "@akasha/spotify/player"
import type { Read, Starting } from "../music-play/music-play.command.code.ts"
import {
  ARTIST,
  DEVICE_ID,
  JSON_FLAG,
  readingArgv,
  startedOn,
} from "../music-play/music-play.command.code.ts"

const INPUT = 1

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

export function queueLinesFor(tracks: readonly ResolvedTrack[]): readonly string[] {
  const [first, ...rest] = tracks
  if (first === undefined) return []
  return [
    `▶ Playing "${trackLabelFor(first)}"`,
    ...rest.map((one) => `  + queued "${trackLabelFor(one)}"`),
  ]
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

async function queued(read: Read, ports: Queueing): Promise<Answer> {
  const queries = read.positionals
  if (queries.length === 0) throw new InputError(NO_QUERY)
  const tracks = await resolvedFor(queries, read.valued.get(ARTIST), ports)
  const [first, ...rest] = tracks
  if (first === undefined) throw new InputError(NO_QUERY)
  const deviceId = await startedOn(first.uri, read.valued.get(DEVICE_ID), ports)
  const deviceOption = deviceId !== undefined ? { deviceId } : {}
  for (const track of rest) {
    await ports.addToQueue(track.uri, deviceOption)
  }
  const said = read.bare.has(JSON_FLAG)
    ? [JSON.stringify(queueEnvelopeFor(queries, tracks, deviceId))]
    : queueLinesFor(tracks)
  return { report: said, refusals: [], code: 0 }
}

export async function queueing(argv: readonly string[], ports: Queueing): Promise<Answer> {
  const read = readingArgv(argv, TAKING_VALUE, TAKING_NONE)
  if ("mistaken" in read) return refused(read.mistaken, INPUT)
  try {
    return await queued(read, ports)
  } catch (thrown) {
    if (isCliError(thrown)) return refused(thrown.message, thrown.code)
    throw thrown
  }
}

export function musicQueue(argv: readonly string[] = []): Promise<Answer> {
  return queueing(argv, QUEUEING)
}
