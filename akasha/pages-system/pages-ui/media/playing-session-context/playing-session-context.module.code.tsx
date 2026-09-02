import { STORED_READ_ALOUD_VARIANT } from "@akasha/pages-ui/media/media-src"
import type { NativeTtsAdapter } from "@akasha/pages-ui/media/native-tts-adapter"
import {
  type ActiveSessionInit,
  IDLE_PLAYING_SESSION,
  type PlayingSessionState,
  playingSessionReducer,
} from "@akasha/pages-ui/media/playing-session"
import {
  persistedToSessionInit,
  readPersistedSession,
} from "@akasha/pages-ui/media/playing-session-storage"
import { useAudioAutoAdvance } from "@akasha/pages-ui/media/use-audio-auto-advance"
import { useAudioSeekAndPlay } from "@akasha/pages-ui/media/use-audio-seek-and-play"
import { useAudioTimeSubscription } from "@akasha/pages-ui/media/use-audio-time-subscription"
import { useAudioTransport } from "@akasha/pages-ui/media/use-audio-transport"
import { useCrossModePositionWrite } from "@akasha/pages-ui/media/use-cross-mode-position-write"
import { usePersistAudioSession } from "@akasha/pages-ui/media/use-persist-audio-session"
import { usePersistentAudioContainer } from "@akasha/pages-ui/media/use-persistent-audio-container"
import type { MediaSrcResolver } from "@akasha/pages-ui/media/use-shell-media-src"
import type { EnsureRenditionFn } from "@akasha/pages-ui/media/use-webkit-read-aloud-ensure"
import { useSetPropertyOptimistic } from "@akasha/pages-ui/supabase/use-set-property-optimistic"
import {
  fractionToTime,
  POSITION_RESUME_MIN_FRACTION,
} from "@akasha/pages-ui-components/position-fraction"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"
import { useFetcher, useLocation, useNavigate } from "react-router"

type PlayingSessionContextValue = {
  readonly state: PlayingSessionState
  readonly startSession: (init: ActiveSessionInit) => void
  readonly restoreSession: (init: ActiveSessionInit) => void
  readonly setVariant: (variant: string) => void
  readonly setSpeed: (speed: number) => void
  readonly stop: () => void
  readonly borrowContainer: (host: HTMLElement) => void
  readonly releaseContainer: (host: HTMLElement) => void
  readonly seekBy: (deltaSeconds: number) => void
  readonly togglePlay: () => void
  readonly playFromSeconds: (seconds: number, ensureInit: ActiveSessionInit) => void
  readonly isPaused: boolean
  readonly isWaiting: boolean
  readonly downloadFraction: number | null
  readonly playbackError: boolean
  readonly retry: () => void
  readonly subscribeTime: (listener: (currentTime: number) => void) => () => void
}

const PlayingSessionContext = createContext<PlayingSessionContextValue | null>(null)

export function usePlayingSession(): PlayingSessionContextValue {
  const ctx = useContext(PlayingSessionContext)
  if (ctx == null) {
    throw new Error("usePlayingSession must be used within a <PlayingSessionProvider>")
  }
  return ctx
}

export function useOptionalPlayingSession(): PlayingSessionContextValue | null {
  return useContext(PlayingSessionContext)
}

export function PlayingSessionProvider({
  children,
  mediaSrcResolver,
  mediaHlsSrcResolver,
  nativeTtsAdapter,
  ensureRendition,
  nativeStartupStallMs,
}: {
  children: React.ReactNode
  mediaSrcResolver?: MediaSrcResolver
  mediaHlsSrcResolver?: MediaSrcResolver
  nativeTtsAdapter?: NativeTtsAdapter
  ensureRendition?: EnsureRenditionFn
  nativeStartupStallMs?: number
}) {
  const [state, dispatch] = useReducer(playingSessionReducer, IDLE_PLAYING_SESSION)
  const audioRef = useRef<HTMLAudioElement>(null)

  const location = useLocation()
  const navigate = useNavigate()
  const fetcher = useFetcher()

  const { portalContainerRef, setFallbackHost, borrowContainer, releaseContainer } =
    usePersistentAudioContainer()

  const [isPaused, setIsPaused] = useState(true)
  const [isWaiting, setIsWaiting] = useState(false)

  const suppressAutoplayRef = useRef(false)
  const restorePositionRef = useRef(0)
  const restorePendingRef = useRef(false)

  const resumeFractionRef = useRef<number | null>(null)

  const setProperty = useSetPropertyOptimistic()

  const startSession = useCallback((init: ActiveSessionInit) => {
    resumeFractionRef.current =
      init.resumeFraction != null &&
      Number.isFinite(init.resumeFraction) &&
      init.resumeFraction > POSITION_RESUME_MIN_FRACTION
        ? init.resumeFraction
        : null
    dispatch({ type: "start", session: init })
  }, [])
  const restoreSession = useCallback((init: ActiveSessionInit) => {
    restorePositionRef.current = 0
    suppressAutoplayRef.current = true
    restorePendingRef.current = true
    dispatch({ type: "start", session: init })
  }, [])
  const setVariant = useCallback((variant: string) => {
    dispatch({ type: "setVariant", variant })
  }, [])
  const setSpeed = useCallback((speed: number) => {
    dispatch({ type: "setSpeed", speed })
  }, [])
  const stop = useCallback(() => {
    dispatch({ type: "stop" })
  }, [])

  const { seekBy, togglePlay, playFromSeconds, consumeResumeSeconds } = useAudioSeekAndPlay(
    audioRef,
    state,
    dispatch
  )

  const active = state.status === "active" ? state : null
  const subscribeTime = useAudioTimeSubscription(audioRef, active)
  const pageId = active?.pageId ?? null
  const variant = active?.variant ?? null
  const medium = active?.medium ?? null
  const speed = active?.speed ?? 1

  const flipToStoredReadAloud = useCallback(() => {
    dispatch({ type: "setVariant", variant: STORED_READ_ALOUD_VARIANT })
  }, [])

  const handleEndedRef = useRef<() => void>(() => {})

  const { src, native, effectiveNative, playbackError, onAudioError, retry } = useAudioTransport({
    mediaSrcResolver,
    mediaHlsSrcResolver,
    nativeTtsAdapter,
    ensureRendition,
    nativeStartupStallMs,
    state,
    speed,
    pageId,
    medium,
    variant,
    startFraction: resumeFractionRef.current,
    onEnded: () => handleEndedRef.current(),
    onDivertReady: flipToStoredReadAloud,
  })

  useEffect(() => {
    const persisted = readPersistedSession()
    if (persisted == null) return
    restorePositionRef.current = persisted.position
    suppressAutoplayRef.current = true
    restorePendingRef.current = true
    dispatch({ type: "start", session: persistedToSessionInit(persisted) })
  }, [])

  useEffect(() => {
    const el = audioRef.current
    if (el == null) return
    if (src == null) {
      el.pause()
      el.removeAttribute("src")
      el.load()
      return
    }
    el.load()
    el.defaultPlaybackRate = speed
    el.playbackRate = speed
    if (suppressAutoplayRef.current) {
      suppressAutoplayRef.current = false
      resumeFractionRef.current = null
      const seekTo = restorePositionRef.current
      const applySeek = () => {
        try {
          el.currentTime = seekTo
        } catch {}
      }
      el.addEventListener("loadedmetadata", applySeek, { once: true })
      applySeek()
      return () => el.removeEventListener("loadedmetadata", applySeek)
    }
    const resumeSecondsCleanup = consumeResumeSeconds(el)
    if (resumeSecondsCleanup != null) return resumeSecondsCleanup
    const resumeFraction = resumeFractionRef.current
    resumeFractionRef.current = null
    if (resumeFraction != null) {
      const applyResumeAndPlay = () => {
        try {
          el.currentTime = fractionToTime(resumeFraction, el.duration)
        } catch {}
        void el.play().catch(() => {})
      }
      if (Number.isFinite(el.duration) && el.duration > 0) applyResumeAndPlay()
      else el.addEventListener("loadedmetadata", applyResumeAndPlay, { once: true })
      return () => el.removeEventListener("loadedmetadata", applyResumeAndPlay)
    }
    void el.play().catch(() => {})
  }, [pageId, variant, medium, src])

  useEffect(() => {
    const el = audioRef.current
    if (el == null || active == null) return
    const apply = () => {
      el.defaultPlaybackRate = speed
      if (el.playbackRate !== speed) el.playbackRate = speed
    }
    apply()
    const resetEvents = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "play",
      "playing",
      "durationchange",
    ] as const
    for (const ev of resetEvents) el.addEventListener(ev, apply)
    return () => {
      for (const ev of resetEvents) el.removeEventListener(ev, apply)
    }
  }, [speed, active])

  useEffect(() => {
    const el = audioRef.current
    if (el == null || active == null) return
    const sync = () => setIsPaused(el.paused)
    sync()
    for (const ev of ["play", "pause", "ended", "emptied"] as const) el.addEventListener(ev, sync)
    return () => {
      for (const ev of ["play", "pause", "ended", "emptied"] as const)
        el.removeEventListener(ev, sync)
    }
  }, [active])

  useEffect(() => {
    const el = audioRef.current
    if (el == null || active == null) {
      setIsWaiting(false)
      return
    }
    const markWaiting = () => setIsWaiting(true)
    const markReady = () => setIsWaiting(false)
    setIsWaiting(el.readyState < 2)
    for (const ev of ["loadstart", "waiting", "stalled", "emptied"] as const)
      el.addEventListener(ev, markWaiting)
    for (const ev of ["canplay", "playing", "error", "ended"] as const)
      el.addEventListener(ev, markReady)
    return () => {
      for (const ev of ["loadstart", "waiting", "stalled", "emptied"] as const)
        el.removeEventListener(ev, markWaiting)
      for (const ev of ["canplay", "playing", "error", "ended"] as const)
        el.removeEventListener(ev, markReady)
    }
  }, [active, pageId, variant, medium])

  usePersistAudioSession({ state, audioRef, restorePendingRef, restorePositionRef })

  useCrossModePositionWrite({ state, audioRef, setProperty })

  const { handleEnded } = useAudioAutoAdvance({ active, location, navigate, fetcher, dispatch })
  handleEndedRef.current = handleEnded

  useEffect(() => {
    if (effectiveNative) native.setRate(speed)
  }, [effectiveNative, speed, native.setRate])

  const contextValue: PlayingSessionContextValue = {
    state,
    startSession,
    restoreSession,
    setVariant,
    setSpeed,
    stop: effectiveNative
      ? () => {
          native.stop()
          stop()
        }
      : stop,
    borrowContainer,
    releaseContainer,
    seekBy: effectiveNative ? native.seekBy : seekBy,
    togglePlay: effectiveNative ? native.togglePlay : togglePlay,
    playFromSeconds,
    isPaused: effectiveNative ? native.isPaused : isPaused,
    isWaiting: effectiveNative ? native.isWaiting : isWaiting,
    downloadFraction: effectiveNative ? native.downloadFraction : null,
    playbackError,
    retry,
    subscribeTime,
  }

  return (
    <PlayingSessionContext value={contextValue}>
      {children}
      {}
      <div ref={setFallbackHost} hidden aria-hidden="true" data-playing-session-fallback-host />
      {}
      {active != null &&
        portalContainerRef.current != null &&
        createPortal(
          <audio
            ref={audioRef}
            controls
            controlsList="noplaybackrate nodownload"
            src={src ?? undefined}
            onEnded={handleEnded}
            onError={onAudioError}
            className="w-full"
          >
            <track kind="captions" />
          </audio>,
          portalContainerRef.current
        )}
    </PlayingSessionContext>
  )
}
