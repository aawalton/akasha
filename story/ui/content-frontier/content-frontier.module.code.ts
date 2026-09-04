import type { SessionEnvelope } from "../client-envelope/client-envelope.module.code.ts"

export function deriveContentFrontier(envelope: SessionEnvelope): string | undefined {
  if (envelope.beatLog !== undefined) {
    const beats = envelope.beatLog
    if (beats === null || beats.length === 0) return undefined
    const newest = beats[beats.length - 1]
    if (newest === undefined) return undefined
    const idPart = newest.id != null ? String(newest.id) : ""
    const turnPart = newest.turn != null ? String(newest.turn) : ""
    return `beat:${beats.length}:${turnPart}:${idPart}`
  }
  const newest = envelope.chapterProse?.at(-1)
  if (newest === undefined) return undefined
  const turnPart = newest.turnNumber != null ? String(newest.turnNumber) : ""
  return `prose:${newest.id}:${turnPart}`
}

export function decideFrontierAdvance(prev: string | undefined, next: string | undefined): boolean {
  if (next === undefined) return false
  return next !== prev
}
