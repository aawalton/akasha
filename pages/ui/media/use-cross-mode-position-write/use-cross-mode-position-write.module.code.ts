import type { PlayingSessionState } from "@akasha/pages-ui/media/playing-session"
import type { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import {
  POSITION_WRITE_EPSILON,
  timeToFraction,
} from "@akasha/pages-ui-components/position-fraction"
import { emitPositionWrite } from "@akasha/pages-ui-components/position-write-event"
import { computeReadProgress } from "@akasha/pages-ui-components/read-progress"
import { type RefObject, useEffect } from "react"

export function useCrossModePositionWrite(args: {
  readonly state: PlayingSessionState
  readonly audioRef: RefObject<HTMLAudioElement | null>
  readonly setProperty: ReturnType<typeof useSetPropertyOptimistic>
}): undefined {
  const { state, audioRef, setProperty } = args
  useEffect(() => {
    if (state.status !== "active" || state.pageTypeSlug === "") return
    const session = state
    const { progressPropertyId, length } = session
    if (progressPropertyId == null || length == null || !(length > 0)) return
    const el = audioRef.current
    if (el == null) return
    let lastWrittenFraction = Number.NaN
    let currentProgress = session.currentProgress
    const writeProgress = () => {
      const duration = el.duration
      if (!Number.isFinite(duration) || duration <= 0) return
      const fraction = timeToFraction(el.currentTime, duration)
      if (
        Number.isFinite(lastWrittenFraction) &&
        Math.abs(fraction - lastWrittenFraction) < POSITION_WRITE_EPSILON
      ) {
        return
      }
      lastWrittenFraction = fraction
      const next = computeReadProgress({
        scrollFraction: fraction,
        wordCount: length,
        currentProgress,
      })
      if (next === undefined) return
      currentProgress = next
      setProperty({
        pageTypeSlug: session.pageTypeSlug,
        pageId: session.pageId,
        propertyId: progressPropertyId,
        value: next,
      })
      emitPositionWrite(session.pageId, next)
    }
    el.addEventListener("timeupdate", writeProgress)
    el.addEventListener("pause", writeProgress)
    return () => {
      el.removeEventListener("timeupdate", writeProgress)
      el.removeEventListener("pause", writeProgress)
    }
  }, [state, audioRef, setProperty])
}
