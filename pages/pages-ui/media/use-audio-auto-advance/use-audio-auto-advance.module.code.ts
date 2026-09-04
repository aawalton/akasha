import type {
  PlayingSessionAction,
  PlayingSessionState,
} from "@akasha/pages-ui/media/playing-session"
import { parseNextSessionFromLoaderData } from "@akasha/pages-ui/media/playing-session-chain"
import { type Dispatch, useEffect, useRef } from "react"
import type { Location, NavigateFunction, useFetcher } from "react-router"

type ActiveSession = Extract<PlayingSessionState, { status: "active" }>

type PendingChain = { readonly href: string; readonly variant: string; readonly speed: number }

export function useAudioAutoAdvance(args: {
  readonly active: ActiveSession | null
  readonly location: Location
  readonly navigate: NavigateFunction
  readonly fetcher: ReturnType<typeof useFetcher>
  readonly dispatch: Dispatch<PlayingSessionAction>
}): { readonly handleEnded: () => void } {
  const { active, location, navigate, fetcher, dispatch } = args
  const pendingChainRef = useRef<PendingChain | null>(null)

  useEffect(() => {
    const pending = pendingChainRef.current
    if (pending == null || fetcher.state !== "idle" || fetcher.data == null) return
    pendingChainRef.current = null
    const next = parseNextSessionFromLoaderData(fetcher.data, {
      loadedHref: pending.href,
      currentVariant: pending.variant,
      currentSpeed: pending.speed,
    })
    dispatch({ type: "advance", next })
  }, [fetcher.state, fetcher.data])

  const handleEnded = () => {
    if (active == null) return
    if (active.nextHref == null) {
      dispatch({ type: "stop" })
      return
    }
    const onPlayingPage = location.pathname === active.pageHref
    if (onPlayingPage) {
      const sep = active.nextHref.includes("?") ? "&" : "?"
      navigate(`${active.nextHref}${sep}variant=${active.variant}&speed=${active.speed}`, {
        state: { mediaAutoplay: true },
      })
      return
    }
    pendingChainRef.current = {
      href: active.nextHref,
      variant: active.variant,
      speed: active.speed,
    }
    fetcher.load(active.nextHref)
  }

  return { handleEnded }
}
