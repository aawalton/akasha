import type { Beat, ChapterEntry, TowerState } from "@akasha/story-tower-core/tower-state"

export type ArchivablePlan = {
  chapter: ChapterEntry
  beats: readonly Beat[]
}

function sliceBeats(log: readonly Beat[], startBeat: string, endBeat: string): readonly Beat[] {
  const startIdx = log.findIndex((b) => b.id === startBeat)
  const endIdx = log.findIndex((b) => b.id === endBeat)
  if (startIdx < 0) {
    throw new Error(`startBeat "${startBeat}" not found in log`)
  }
  if (endIdx < 0) {
    throw new Error(`endBeat "${endBeat}" not found in log`)
  }
  if (endIdx < startIdx) {
    throw new Error(`endBeat "${endBeat}" precedes startBeat "${startBeat}"`)
  }
  return log.slice(startIdx, endIdx + 1)
}

export function planArchive(state: TowerState, keepWindow = 2): readonly ArchivablePlan[] {
  const closed = state.chapters.filter((c) => c.status === "closed")
  const keepClosedCount = Math.max(0, keepWindow - 1)
  const keepFromIndex = Math.max(0, closed.length - keepClosedCount)
  const archivableClosed = new Set(closed.slice(0, keepFromIndex))

  const plans: ArchivablePlan[] = []
  for (const chapter of state.chapters) {
    if (!archivableClosed.has(chapter)) continue
    if (chapter.startBeat === undefined) {
      throw new Error(`closed chapter ${chapter.number} has no startBeat`)
    }
    if (chapter.endBeat === undefined) {
      throw new Error(`closed chapter ${chapter.number} has no endBeat`)
    }
    plans.push({
      chapter,
      beats: sliceBeats(state.log, chapter.startBeat, chapter.endBeat),
    })
  }
  return plans
}
