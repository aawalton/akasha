import { type RefObject, useCallback, useRef } from "react"

export function usePersistentAudioContainer(): {
  readonly portalContainerRef: RefObject<HTMLDivElement | null>
  readonly setFallbackHost: (node: HTMLElement | null) => void
  readonly borrowContainer: (host: HTMLElement) => void
  readonly releaseContainer: (host: HTMLElement) => void
} {
  const portalContainerRef = useRef<HTMLDivElement | null>(null)
  if (portalContainerRef.current == null && typeof document !== "undefined") {
    const container = document.createElement("div")
    container.style.display = "contents"
    container.dataset.persistentAudioContainer = "true"
    portalContainerRef.current = container
  }

  const fallbackHostRef = useRef<HTMLElement | null>(null)
  const currentHostRef = useRef<HTMLElement | null>(null)

  const parkInFallback = useCallback(() => {
    const container = portalContainerRef.current
    const fallback = fallbackHostRef.current
    if (container == null || fallback == null) return
    if (container.parentElement !== fallback) fallback.appendChild(container)
  }, [])

  const setFallbackHost = useCallback(
    (node: HTMLElement | null) => {
      fallbackHostRef.current = node
      if (node != null && currentHostRef.current == null) parkInFallback()
    },
    [parkInFallback]
  )

  const borrowContainer = useCallback((host: HTMLElement) => {
    const container = portalContainerRef.current
    if (container == null) return
    currentHostRef.current = host
    if (container.parentElement !== host) host.appendChild(container)
  }, [])

  const releaseContainer = useCallback(
    (host: HTMLElement) => {
      if (currentHostRef.current !== host) return
      currentHostRef.current = null
      parkInFallback()
    },
    [parkInFallback]
  )

  return { portalContainerRef, setFallbackHost, borrowContainer, releaseContainer }
}
