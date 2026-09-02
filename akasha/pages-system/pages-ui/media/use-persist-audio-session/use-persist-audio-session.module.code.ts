import type { PlayingSessionState } from "@akasha/pages-ui/media/playing-session"
import {
  clearPersistedSession,
  writePersistedSession,
} from "@akasha/pages-ui/media/playing-session-storage"
import { type RefObject, useEffect } from "react"

const PERSIST_INTERVAL_SECONDS = 5

export function usePersistAudioSession(args: {
  readonly state: PlayingSessionState
  readonly audioRef: RefObject<HTMLAudioElement | null>
  readonly restorePendingRef: RefObject<boolean>
  readonly restorePositionRef: RefObject<number>
}): undefined {
  const { state, audioRef, restorePendingRef, restorePositionRef } = args
  useEffect(() => {
    if (state.status !== "active") {
      clearPersistedSession()
      return
    }
    const session = state
    const el = audioRef.current
    const write = () => {
      const pos = restorePendingRef.current ? restorePositionRef.current : (el?.currentTime ?? 0)
      restorePendingRef.current = false
      writePersistedSession(session, pos)
    }
    write()
    if (el == null) return
    let lastPersisted = el.currentTime
    const onTimeUpdate = () => {
      if (Math.abs(el.currentTime - lastPersisted) >= PERSIST_INTERVAL_SECONDS) {
        lastPersisted = el.currentTime
        write()
      }
    }
    const onPause = () => write()
    el.addEventListener("timeupdate", onTimeUpdate)
    el.addEventListener("pause", onPause)
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate)
      el.removeEventListener("pause", onPause)
    }
  }, [state])
}
