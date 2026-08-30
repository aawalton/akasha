import type { RingCounts } from "../../../akasha/alan-harness/monarch-unreviewed-transactions/monarch-unreviewed-transactions.module.code.ts"

export const REFRESH_AFTER_MS = 5 * 60_000

export const STALE_AFTER_MS = 45 * 60_000

interface StoredReading {
  readonly counts: RingCounts
  readonly takenAt: number
}

export interface RingReader {
  readonly read: (now?: Date) => Promise<RingCounts | null>
}

export interface RingReaderOptions {
  readonly fetchCounts: (now: Date) => Promise<RingCounts>
  readonly refreshAfterMs?: number
  readonly staleAfterMs?: number
}

export function createRingReader(options: RingReaderOptions): RingReader {
  const refreshAfterMs = options.refreshAfterMs ?? REFRESH_AFTER_MS
  const staleAfterMs = options.staleAfterMs ?? STALE_AFTER_MS

  let stored: StoredReading | null = null
  let inFlight: Promise<void> | null = null

  async function refresh(now: Date): Promise<void> {
    if (inFlight) return inFlight
    inFlight = (async () => {
      try {
        stored = { counts: await options.fetchCounts(now), takenAt: now.getTime() }
      } catch {
      } finally {
        inFlight = null
      }
    })()
    return inFlight
  }

  return {
    async read(now: Date = new Date()): Promise<RingCounts | null> {
      const age = stored === null ? Number.POSITIVE_INFINITY : now.getTime() - stored.takenAt
      if (age >= refreshAfterMs) await refresh(now)

      if (stored === null) return null
      const ageNow = now.getTime() - stored.takenAt
      return ageNow >= staleAfterMs ? null : stored.counts
    },
  }
}
