import { akashaSeatsThatExist } from "@akasha/seat-system/seat-akasha-beside"
import { akashaSeatRecordOf } from "@akasha/seat-system/seat-akasha-read"
import type { Answer, Given } from "../../../modules/calling/calling.module.code.ts"
import { whyOf } from "../../../modules/fault-saying/fault-saying.module.code.ts"

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

export function seatTranscripts(argv: readonly string[], _given: Given): Answer {
  if (argv.length > 0) {
    const said = argv.map((one) => `\`${one}\``).join(", ")
    const are = argv.length === 1 ? "is no word this takes" : "are no words this takes"
    return { report: [], refusals: [`${said} ${are} — this command takes none`], code: 1 }
  }
  try {
    return { report: [saidOf(transcriptsNow())], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
