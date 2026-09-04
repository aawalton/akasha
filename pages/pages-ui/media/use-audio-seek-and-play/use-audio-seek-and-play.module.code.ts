import { shouldSeekInPlace } from "@akasha/pages-ui/media/play-from-sentence"
import type {
  ActiveSessionInit,
  PlayingSessionAction,
  PlayingSessionState,
} from "@akasha/pages-ui/media/playing-session"
import { type Dispatch, type RefObject, useCallback, useRef } from "react"

export function useAudioSeekAndPlay(
  audioRef: RefObject<HTMLAudioElement | null>,
  state: PlayingSessionState,
  dispatch: Dispatch<PlayingSessionAction>
) {
  const stateRef = useRef(state)
  stateRef.current = state

  const resumeSecondsRef = useRef<number | null>(null)

  const seekBy = useCallback(
    (deltaSeconds: number) => {
      const el = audioRef.current
      if (el == null) return
      const duration = Number.isFinite(el.duration) ? el.duration : Number.POSITIVE_INFINITY
      el.currentTime = Math.max(0, Math.min(el.currentTime + deltaSeconds, duration))
    },
    [audioRef]
  )

  const togglePlay = useCallback(() => {
    const el = audioRef.current
    if (el == null) return
    if (el.paused) {
      void el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [audioRef])

  const playFromSeconds = useCallback(
    (seconds: number, ensureInit: ActiveSessionInit) => {
      if (shouldSeekInPlace(stateRef.current, ensureInit)) {
        const el = audioRef.current
        if (el == null) return
        seekThenPlay(el, seconds)
        return
      }
      resumeSecondsRef.current = seconds
      dispatch({ type: "start", session: ensureInit })
    },
    [audioRef, dispatch]
  )

  const consumeResumeSeconds = useCallback((el: HTMLAudioElement): (() => void) | null => {
    const seconds = resumeSecondsRef.current
    resumeSecondsRef.current = null
    if (seconds == null) return null
    return seekThenPlay(el, seconds)
  }, [])

  return { seekBy, togglePlay, playFromSeconds, consumeResumeSeconds }
}

function seekThenPlay(el: HTMLAudioElement, seconds: number): () => void {
  const apply = () => {
    try {
      el.currentTime = seconds
    } catch {}
    void el.play().catch(() => {})
  }
  el.addEventListener("loadedmetadata", apply, { once: true })
  apply()
  return () => el.removeEventListener("loadedmetadata", apply)
}
