import type { WatcherLogLine } from "../watcher-log-line/watcher-log-line.module.code.ts"

type Timed = {
  readonly read: WatcherLogLine
  readonly epochMs: number
}

function timedSince(lines: readonly WatcherLogLine[], sinceMs: number): readonly Timed[] {
  const kept: Timed[] = []
  for (const read of lines) {
    const epochMs = Date.parse(read.timestamp)
    if (epochMs >= sinceMs) kept.push({ read, epochMs })
  }
  return kept
}

export function mergeNewestFirst(
  fromWorker: readonly WatcherLogLine[],
  fromTray: readonly WatcherLogLine[],
  sinceMs: number
): readonly WatcherLogLine[] {
  const merged = [...timedSince(fromWorker, sinceMs), ...timedSince(fromTray, sinceMs)]
  merged.sort((a, b) => {
    if (a.epochMs !== b.epochMs) return b.epochMs - a.epochMs
    if (a.read.source === b.read.source) return 0
    return a.read.source < b.read.source ? -1 : 1
  })
  return merged.map((one) => one.read)
}
