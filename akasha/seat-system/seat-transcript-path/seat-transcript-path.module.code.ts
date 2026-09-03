import { pageTextOf } from "../seat-page-values/seat-page-values.module.code.ts"
import { keepSeatRecord, seatRecordOf } from "../seat-record/seat-record.module.code.ts"

export const TRANSCRIPT_KEY = "transcript-path"

const KEY = TRANSCRIPT_KEY

export interface TranscriptRecord {
  readonly value: string
}

export function transcriptOf(agent: string): TranscriptRecord | null {
  const kept = seatRecordOf(agent, KEY)
  if (kept !== null) return { value: kept.value }
  const held = pageTextOf(agent, KEY)
  return held === null ? null : { value: held }
}

export function keepTranscript(agent: string, value: string, at?: number): void {
  keepSeatRecord(agent, KEY, value, at)
}

export function transcriptRecordOf(value: string | null): TranscriptRecord | null {
  return value === null || value === "" ? null : { value }
}
