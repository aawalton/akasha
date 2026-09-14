import { LOG } from "akasha/agents/seats/supervisors/supervisor-process/modules/supervisor-config/supervisor-config.module.code.ts"

const POLL_INTERVAL_MS = 1_000

export const WAITING_AT_MOST_MS = 120_000

const MID_REFRESH = "an index that is missing is not an index naming none"

export type RotationHandler = (sessionId: string) => Promise<void>

export type RotationSaying = (text: string, err?: unknown) => undefined

export type RotationWatch = {
  readonly pollMs?: number
  readonly waitingAtMostMs?: number
  readonly now?: () => number
  readonly say?: RotationSaying
}

function sayAnyway(text: string, err?: unknown): undefined {
  try {
    if (err === undefined) console.error(`${LOG} ${text}`)
    else console.error(`${LOG} ${text}`, err)
    return
  } catch {}
  try {
    process.stderr.write(`${LOG} ${text}\n`)
  } catch {
    return
  }
}

function midRefresh(err: unknown): boolean {
  return err instanceof Error && err.message.includes(MID_REFRESH)
}

export function watchSeatRotation(
  claimRotation: () => string | null,
  onRotation: RotationHandler,
  watch: RotationWatch = {}
): () => void {
  const pollMs = watch.pollMs ?? POLL_INTERVAL_MS
  const waitingAtMostMs = watch.waitingAtMostMs ?? WAITING_AT_MOST_MS
  const now = watch.now ?? Date.now
  const say = watch.say ?? sayAnyway
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
