import type { Medium } from "@akasha/pages-core/media-formats"
import { KOKORO_STREAM_VARIANT } from "@akasha/pages-ui/media/media-src"
import { usePlayingSession } from "@akasha/pages-ui/media/playing-session-context"
import { readPersistedSession } from "@akasha/pages-ui/media/playing-session-storage"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useLocation, useSearchParams } from "react-router"
import { z } from "zod"

export type MediaVariant = { id: string; label: string }

type PageMediaPlayerProps = {
  pageId: string
  pageTypeSlug: string
  title: string
  medium: Medium
  variants: readonly MediaVariant[]
  nextHref: string | null
  defaultVariant?: string | null
  resumeFraction?: number
  length?: number
  currentProgress?: number
  progressPropertyId?: string
  text?: string
}

const AUTO_ADVANCE_STATE_SCHEMA = z.object({ mediaAutoplay: z.boolean().optional() }).strict()

const SPEED_OPTIONS = [1, 1.25, 1.5, 1.75, 2] as const
const DEFAULT_SPEED = 1

function parseSpeed(raw: string | null): number {
  if (raw == null) return DEFAULT_SPEED
  const n = Number(raw)
  return SPEED_OPTIONS.some((o) => o === n) ? n : DEFAULT_SPEED
}

export function PageMediaPlayer({
  pageId,
  pageTypeSlug,
  title,
  medium,
  variants,
  nextHref,
  defaultVariant = null,
  resumeFraction,
  length,
  currentProgress,
  progressPropertyId,
  text,
}: PageMediaPlayerProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get("variant") ?? defaultVariant
  const speed = parseSpeed(searchParams.get("speed"))
  const location = useLocation()
  const {
    state,
    startSession,
    restoreSession,
    setVariant,
    setSpeed,
    borrowContainer,
    releaseContainer,
    isWaiting,
    downloadFraction,
    playbackError,
    retry,
  } = usePlayingSession()

  const selectedAvailable = selected != null && variants.some((v) => v.id === selected)
  const isActivePage = state.status === "active" && state.pageId === pageId
  const isGeneratingStream =
    isActivePage && isWaiting && selected === KOKORO_STREAM_VARIANT && !playbackError
  const showPlaybackError = isActivePage && playbackError && selected === KOKORO_STREAM_VARIANT

  const hostRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const host = hostRef.current
    if (!isActivePage || host == null) return
    borrowContainer(host)
    return () => releaseContainer(host)
  }, [isActivePage, borrowContainer, releaseContainer])

  const buildInit = (variant: string) => ({
    pageId,
    pageTypeSlug,
    pageHref: location.pathname,
    title,
    medium,
    variant,
    speed,
    nextHref,
    length,
    currentProgress,
    progressPropertyId,
    text,
  })

  const arrivedViaAutoAdvance =
    AUTO_ADVANCE_STATE_SCHEMA.safeParse(location.state).data?.mediaAutoplay === true
  const autoStartedRef = useRef(false)
  useEffect(() => {
    if (!arrivedViaAutoAdvance || autoStartedRef.current) return
    if (selected == null || !selectedAvailable) return
    autoStartedRef.current = true
    startSession(buildInit(selected))
  }, [arrivedViaAutoAdvance, selected, selectedAvailable])

  const deepLinkRestoredRef = useRef(false)
  useEffect(() => {
    if (deepLinkRestoredRef.current || arrivedViaAutoAdvance) return
    const variantParam = searchParams.get("variant")
    if (variantParam == null || !variants.some((v) => v.id === variantParam)) return
    if (readPersistedSession() != null) return
    deepLinkRestoredRef.current = true
    restoreSession(buildInit(variantParam))
  }, [])

  const selectVariant = (id: string) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set("variant", id)
        return next
      },
      { preventScrollReset: true }
    )
    if (isActivePage) setVariant(id)
    else startSession({ ...buildInit(id), resumeFraction })
  }

  const selectSpeed = (rate: number) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set("speed", String(rate))
        return next
      },
      { replace: true, preventScrollReset: true }
    )
    if (isActivePage) setSpeed(rate)
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-tertiary text-xs uppercase tracking-wide">Listen</span>
        {variants.length === 0 ? (
          <span className="text-tertiary text-xs italic">No narration rendered yet</span>
        ) : (
          variants.map((v) => {
            const isSelected = selected === v.id
            return (
              <button
                key={v.id}
                type="button"
                data-testid="media-variant-option"
                data-variant-id={v.id}
                onClick={() => selectVariant(v.id)}
                title={`Narrated by ${v.label}`}
                className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                  isSelected
                    ? "bg-accent/10 text-primary"
                    : "text-secondary hover:bg-primary/5 hover:text-primary"
                }`}
              >
                {v.label}
              </button>
            )
          })
        )}
      </div>

      {}
      {(isActivePage || selected != null) && (
        <>
          <div ref={hostRef} data-testid="media-in-page-host" className="w-full" />
          {isGeneratingStream &&
            (downloadFraction != null ? (
              <p data-testid="media-downloading" className="text-tertiary text-xs italic">
                Downloading voice… {Math.round(downloadFraction * 100)}%
                <span className="text-tertiary/80"> · keep the app open (first time only)</span>
              </p>
            ) : (
              <p data-testid="media-generating" className="text-tertiary text-xs italic">
                Generating audio…
              </p>
            ))}
          {showPlaybackError && (
            <p data-testid="media-error" className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-secondary italic">Couldn't play audio.</span>
              <button
                type="button"
                data-testid="media-retry"
                onClick={retry}
                className="rounded-md px-2.5 py-1 text-accent transition-colors hover:bg-primary/5"
              >
                Try again
              </button>
            </p>
          )}
          {selectedAvailable ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-tertiary text-xs uppercase tracking-wide">Speed</span>
              {SPEED_OPTIONS.map((rate) => {
                const isActive = speed === rate
                return (
                  <button
                    key={rate}
                    type="button"
                    data-testid="speed-option"
                    data-speed={String(rate)}
                    aria-pressed={isActive}
                    onClick={() => selectSpeed(rate)}
                    className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                      isActive
                        ? "bg-accent/10 text-primary"
                        : "text-secondary hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {rate}×
                  </button>
                )
              })}
            </div>
          ) : (
            selected != null && (
              <p className="text-tertiary text-xs italic">
                Audio for this narrator isn't rendered for this page yet.
              </p>
            )
          )}
        </>
      )}
    </div>
  )
}
