import { sayingWith } from "akasha/agents/seats/supervisors/supervisor-log/modules/supervisor-saying/supervisor-saying.module.code.ts"
import { LOG } from "akasha/agents/seats/supervisors/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"
import {
  midRefresh,
  REFRESH_WAITED_AT_MOST_MS,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"

const POLL_INTERVAL_MS = 1_000

export type RotationHandler = (sessionId: string) => Promise<void>

export type RotationSaying = (text: string, err?: unknown) => undefined

export type RotationWatch = {
  readonly pollMs?: number
  readonly waitingAtMostMs?: number
  readonly now?: () => number
  readonly say?: RotationSaying
}

export function watchSeatRotation(
  claimRotation: () => string | null,
  onRotation: RotationHandler,
  watch: RotationWatch = {}
): () => void {
  const pollMs = watch.pollMs ?? POLL_INTERVAL_MS
  const waitingAtMostMs = watch.waitingAtMostMs ?? REFRESH_WAITED_AT_MOST_MS
  const now = watch.now ?? Date.now
  const say = watch.say ?? sayingWith(LOG)
  const waitedSeconds = Math.round(waitingAtMostMs / 1_000)
  let stopped = false
  let waitingSince: number | null = null

  const tick = async (): Promise<void> => {
    if (stopped) return
    try {
      const rotated = claimRotation()
      waitingSince = null
      if (rotated !== null) await onRotation(rotated)
    } catch (err) {
      if (!midRefresh(err)) {
        say("rebind: reading the seat's rotation threw:", err)
      } else if (waitingSince === null) {
        waitingSince = now()
        say("rebind: the index is part way through a refresh, so the rotation is asked again")
      } else if (now() - waitingSince >= waitingAtMostMs) {
        waitingSince = null
        say(
          `rebind: the index stayed part way through a refresh for ${waitedSeconds}s, so the rotation goes unread and the asking starts over`
        )
      }
    } finally {
      if (!stopped) setTimeout(tick, pollMs)
    }
  }

  void tick()
  return () => {
    stopped = true
  }
}
