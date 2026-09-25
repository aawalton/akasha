import { getQueue } from "akasha/alan/music/spotify/modules/player/spotify-player.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  answering,
  INPUT,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { musicUpcoming as page } from "akasha/command/pages/music/upcoming/music-upcoming.command.ts"

const NAMED = [json]

const NOTHING = "(nothing)"

const NONE_QUEUED = "(nothing queued)"

type QueuedTrack = {
  readonly name: string
  readonly uri: string
  readonly id: string | null
}

export type Queued = {
  readonly currently_playing: QueuedTrack | null
  readonly queue: readonly QueuedTrack[]
}

export type Upcoming = {
  readonly getQueue: () => Promise<Queued>
}

const UPCOMING: Upcoming = { getQueue }

type UpcomingEnvelope = {
  readonly playing: QueuedTrack | null
  readonly queue: readonly QueuedTrack[]
}

function trackOf(one: QueuedTrack): QueuedTrack {
  return { name: one.name, uri: one.uri, id: one.id }
}

export function envelopeOf(queued: Queued): UpcomingEnvelope {
  const playing = queued.currently_playing
  return {
    playing: playing === null ? null : trackOf(playing),
    queue: queued.queue.map(trackOf),
  }
}

export function linesOf(envelope: UpcomingEnvelope): readonly string[] {
  const first = `▶ Now: ${envelope.playing?.name ?? NOTHING}`
  if (envelope.queue.length === 0) return [first, `  ${NONE_QUEUED}`]
  return [first, ...envelope.queue.map((one, at) => `  ${at + 1}. ${one.name}`)]
}

export async function upcoming(
  argv: readonly string[],
  ports: Upcoming,
  calledAs: string
): Promise<Answer> {
  const read = takenFor(argv, calledAs, page, NAMED)
  if ("refused" in read) return refusedBy(read.refused, INPUT)
  const taken = read.taken
  return await answering(async () => {
    const envelope = envelopeOf(await ports.getQueue())
    return told(taken.json ? [JSON.stringify(envelope)] : [...linesOf(envelope)])
  })
}

export function musicUpcoming(argv: readonly string[], given: Given): Promise<Answer> {
  return upcoming(argv, UPCOMING, given.calledAs)
}
