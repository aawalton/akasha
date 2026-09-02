import { isWebKitClient } from "@akasha/pages-ui/media/is-webkit"
import { mediaHlsSrcForVariant, mediaSrcForVariant } from "@akasha/pages-ui/media/media-src"
import type { NativeTtsAdapter } from "@akasha/pages-ui/media/native-tts-adapter"
import type { PlayingSessionState } from "@akasha/pages-ui/media/playing-session"
import { selectTransport, type Transport } from "@akasha/pages-ui/media/transport-selection"
import { useNativeTtsTransport } from "@akasha/pages-ui/media/use-native-tts-transport"
import { type MediaSrcResolver, useShellMediaSrc } from "@akasha/pages-ui/media/use-shell-media-src"
import {
  type EnsureRenditionFn,
  useWebKitReadAloudDivert,
} from "@akasha/pages-ui/media/use-webkit-read-aloud-ensure"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { useCallback, useEffect, useState } from "react"

type NativeTransport = ReturnType<typeof useNativeTtsTransport>

export type AudioTransport = {
  readonly src: string | null
  readonly native: NativeTransport
  readonly effectiveNative: boolean
  readonly playbackError: boolean
  readonly onAudioError: () => void
  readonly retry: () => void
}

export function useAudioTransport({
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
  startFraction,
  onEnded,
  onDivertReady,
}: {
  mediaSrcResolver: MediaSrcResolver | undefined
  mediaHlsSrcResolver: MediaSrcResolver | undefined
  nativeTtsAdapter: NativeTtsAdapter | undefined
  ensureRendition: EnsureRenditionFn | undefined
  nativeStartupStallMs: number | undefined
  state: PlayingSessionState
  speed: number
  pageId: string | null
  medium: string | null
  variant: string | null
  startFraction: number | null
  onEnded: () => void
  onDivertReady: () => void
}): AudioTransport {
  const [isWebKit] = useState(isWebKitClient)

  const transport = selectTransport({
    hasResolver: mediaSrcResolver != null,
    hasNativeTts: nativeTtsAdapter != null,
    isWebKit,
    variant: variant ?? "",
  })
  const isNativeTransport = transport === "native-plugin"

  const fromSentence = state.status === "active" ? (state.fromSentence ?? null) : null

  const [retryNonce, setRetryNonce] = useState(0)

  const native = useNativeTtsTransport({
    adapter: nativeTtsAdapter ?? null,
    isNativeTransport,
    state,
    speed,
    startFraction,
    onEnded,
    startupStallMs: nativeStartupStallMs,
    retryNonce,
  })
  const effectiveNative = isNativeTransport && !native.failed
  const nativeFailedCascade = transport === "native-plugin" && native.failed

  const [hlsFailed, setHlsFailed] = useState(false)
  const [playbackError, setPlaybackError] = useState(false)
  useEffect(() => {
    setHlsFailed(false)
    setPlaybackError(false)
  }, [pageId, medium])

  const effectiveTransport: Transport = nativeFailedCascade
    ? isWebKit
      ? "hls-src"
      : "shell-src"
    : transport
  const isHlsEffective = effectiveTransport === "hls-src"
  const divertActive = isHlsEffective && hlsFailed
  const onDivertUnavailable = useCallback(() => setPlaybackError(true), [])
  useWebKitReadAloudDivert({
    enabled: divertActive,
    pageId,
    medium,
    ensureRendition,
    onReady: onDivertReady,
    onUnavailable: onDivertUnavailable,
  })

  const onAudioError = useCallback(() => {
    if (isHlsEffective && !hlsFailed) {
      setHlsFailed(true)
      return
    }
    if (nativeFailedCascade) setPlaybackError(true)
  }, [isHlsEffective, hlsFailed, nativeFailedCascade])

  const retry = useCallback(() => {
    setPlaybackError(false)
    setHlsFailed(false)
    setRetryNonce((n) => n + 1)
  }, [])

  const resolvedSrc = useShellMediaSrc({
    mediaSrcResolver,
    pageId,
    medium,
    variant,
    fromSentence,
    suppressed: effectiveTransport !== "shell-src",
  })
  const resolvedHlsSrc = useShellMediaSrc({
    mediaSrcResolver: mediaHlsSrcResolver,
    pageId,
    medium,
    variant,
    fromSentence,
    suppressed: !isHlsEffective,
  })

  const hasTrack = pageId != null && medium != null && variant != null
  const hlsSrc =
    hasTrack && isHlsEffective
      ? mediaHlsSrcResolver != null
        ? resolvedHlsSrc
        : mediaHlsSrcForVariant(pageId, medium, fromSentence)
      : null
  const relativeSrc = hasTrack ? mediaSrcForVariant(pageId, medium, variant, fromSentence) : null

  const src = ((): string | null => {
    if (divertActive) return null
    switch (effectiveTransport) {
      case "native-plugin":
        return null
      case "hls-src":
        return hlsSrc
      case "shell-src":
        return resolvedSrc
      case "web-src":
        return relativeSrc
      default:
        return assertNever(effectiveTransport)
    }
  })()

  return { src, native, effectiveNative, playbackError, onAudioError, retry }
}
