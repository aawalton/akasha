import {
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { akashaSeatsThatExist } from "akasha/seat-system/seat-akasha-beside/seat-akasha-beside.module.code.ts"
import { akashaSeatRecordOf } from "akasha/seat-system/seat-akasha-read/seat-akasha-read.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

const TRANSCRIPT_KEY = "transcript-path"

export interface SeatTranscript {
  readonly agentId: string
  readonly seatName: string
  readonly transcriptPath: string
}

export type Held = { readonly value: string } | null

export type Reading = (agentId: string, key: string) => Held

export function transcriptsOver(
  seats: Iterable<readonly [string, string]>,
  reading: Reading
): readonly SeatTranscript[] {
  const found: SeatTranscript[] = []
  for (const [agentId, seatName] of seats) {
    const held = reading(agentId, TRANSCRIPT_KEY)
    if (held === null || held.value === "") continue
    found.push({ agentId, seatName, transcriptPath: held.value })
  }
  return found
}

export function transcriptsNow(): readonly SeatTranscript[] {
  return transcriptsOver(akashaSeatsThatExist(), akashaSeatRecordOf)
}

export function saidOf(seats: readonly SeatTranscript[]): string {
  return JSON.stringify({ seats })
}

export function seatTranscriptList(argv: readonly string[], _given: Given): Answer {
  if (argv.length > 0) {
    const said = namesDrawn(argv)
    const are = argv.length === 1 ? "is no word this takes" : "are no words this takes"
    return refusedBy([`${said} ${are} — this command takes none`])
  }
  try {
    return told([saidOf(transcriptsNow())])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], DATA)
  }
}
