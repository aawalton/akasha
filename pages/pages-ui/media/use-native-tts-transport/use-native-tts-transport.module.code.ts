import type { NativeTtsAdapter } from "@akasha/pages-ui/media/native-tts-adapter"
import type { PlayingSessionState } from "@akasha/pages-ui/media/playing-session"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { useCallback, useEffect, useRef, useState } from "react"

export type NativeTtsTransportState = {
  readonly isPaused: boolean
  readonly isWaiting: boolean
  readonly positionFraction: number
  readonly playedSeconds: number
  readonly failed: boolean
  readonly downloadFraction: number | null
  readonly togglePlay: () => void
  readonly setRate: (rate: number) => void
  readonly seekBy: (deltaSeconds: number) => void
  readonly stop: () => void
}

type NativeTtsFlags = Omit<
  NativeTtsTransportState,
  "togglePlay" | "setRate" | "seekBy" | "stop"
> & {
  readonly playbackStarted: boolean
}

const IDLE: NativeTtsFlags = {
  isPaused: true,
  isWaiting: false,
  positionFraction: 0,
  playedSeconds: 0,
  failed: false,
  downloadFraction: null,
  playbackStarted: false,
}

export const STARTUP_STALL_MS = 20_000

export function useNativeTtsTransport(args: {
  readonly adapter: NativeTtsAdapter | null
  readonly isNativeTransport: boolean
  readonly state: PlayingSessionState
  readonly speed: number
  readonly startFraction: number | null
  readonly onEnded: () => void
  readonly startupStallMs?: number
  readonly retryNonce?: number
}): NativeTtsTransportState {
  const { adapter, isNativeTransport, state, speed, startFraction, onEnded } = args
  const retryNonce = args.retryNonce ?? 0
  const stallMs = args.startupStallMs ?? STARTUP_STALL_MS
  const active = state.status === "active" ? state : null
  const pageId = active?.pageId ?? null
  const text = active?.text ?? null

  const [flags, setFlags] = useState(IDLE)

  const flagsRef = useRef(flags)
  flagsRef.current = flags
  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded
  const startFractionRef = useRef(startFraction)
  startFractionRef.current = startFraction
  const speedRef = useRef(speed)
  speedRef.current = speed

  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const disarmWatchdog = useCallback(() => {
    if (watchdogRef.current != null) {
      clearTimeout(watchdogRef.current)
      watchdogRef.current = null
    }
  }, [])
  const kickWatchdog = useCallback(() => {
    if (watchdogRef.current != null) clearTimeout(watchdogRef.current)
    watchdogRef.current = setTimeout(() => {
      watchdogRef.current = null
      setFlags((f) => (f.failed ? f : { ...f, failed: true, isWaiting: false, isPaused: true }))
    }, stallMs)
  }, [stallMs])

  useEffect(() => {
    if (adapter == null || !isNativeTransport) return
    const unsubscribe = adapter.subscribe((event) => {
      switch (event.type) {
        case "progress":
          disarmWatchdog()
          setFlags((f) => ({
            ...f,
            positionFraction: event.positionFraction,
            playedSeconds: event.playedSeconds,
            isWaiting: false,
            isPaused: false,
            downloadFraction: null,
            playbackStarted: true,
          }))
          break
        case "waiting":
          setFlags((f) => ({ ...f, isWaiting: true }))
          break
        case "playing":
          disarmWatchdog()
          setFlags((f) => ({
            ...f,
            isWaiting: false,
            isPaused: false,
            downloadFraction: null,
            playbackStarted: true,
          }))
          break
        case "downloadProgress":
          kickWatchdog()
          setFlags((f) => ({
            ...f,
            isWaiting: true,
            downloadFraction: event.total > 0 ? Math.min(1, event.received / event.total) : null,
          }))
          break
        case "ended":
          disarmWatchdog()
          setFlags((f) => ({ ...f, isPaused: true }))
          onEndedRef.current()
          break
        case "error":
          disarmWatchdog()
          setFlags((f) => ({ ...f, failed: true, isWaiting: false, isPaused: true }))
          break
        default:
          assertNever(event)
      }
    })
    return unsubscribe
  }, [adapter, isNativeTransport, kickWatchdog, disarmWatchdog])

  useEffect(() => {
    if (adapter == null || !isNativeTransport || pageId == null) {
      disarmWatchdog()
      setFlags(IDLE)
      return
    }
    const hasText = text != null && text.length > 0
    if (!hasText) {
      disarmWatchdog()
      setFlags({ ...IDLE, failed: true })
      return
    }
    setFlags({ ...IDLE, isWaiting: true })
    kickWatchdog()
    let cancelled = false
    const rawText = text
    void (async () => {
      try {
        await adapter.prepare()
        if (cancelled) return
        await adapter.startChapter({
          chapterId: pageId,
          text: rawText,
          startFraction: startFractionRef.current ?? undefined,
          rate: speedRef.current,
        })
      } catch {
        if (!cancelled) {
          disarmWatchdog()
          setFlags((f) => ({ ...f, failed: true, isWaiting: false, isPaused: true }))
        }
      }
    })()
    return () => {
      cancelled = true
      disarmWatchdog()
      void adapter.stop().catch(() => {})
    }
  }, [adapter, isNativeTransport, pageId, text, retryNonce, kickWatchdog, disarmWatchdog])

  const togglePlay = useCallback(() => {
    if (adapter == null) return
    const f = flagsRef.current
    if (!f.playbackStarted) return
    if (f.isPaused) void adapter.resume().catch(() => {})
    else void adapter.pause().catch(() => {})
    setFlags((prev) => ({ ...prev, isPaused: !prev.isPaused }))
  }, [adapter])

  const setRate = useCallback(
    (rate: number) => {
      if (adapter == null) return
      void adapter.setRate(rate).catch(() => {})
    },
    [adapter]
  )

  const seekBy = useCallback(
    (deltaSeconds: number) => {
      if (adapter == null) return
      setFlags((f) => {
        if (f.positionFraction <= 0 || f.playedSeconds <= 0) return f
        const estimatedTotalSeconds = f.playedSeconds / f.positionFraction
        const next = Math.max(
          0,
          Math.min(1, f.positionFraction + deltaSeconds / estimatedTotalSeconds)
        )
        void adapter.seek(next).catch(() => {})
        return { ...f, positionFraction: next }
      })
    },
    [adapter]
  )

  const stop = useCallback(() => {
    if (adapter == null) return
    void adapter.stop().catch(() => {})
    setFlags(IDLE)
  }, [adapter])

  return { ...flags, togglePlay, setRate, seekBy, stop }
}
