"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"

const STORAGE_KEY = "sidebar-collapsed"

const BREAKPOINT_HIDDEN = 584
const BREAKPOINT_FORCED_COLLAPSED = 776

function getServerSnapshot(): number {
  return BREAKPOINT_FORCED_COLLAPSED
}

function getSnapshot(): number {
  return window.innerWidth
}

function subscribe(callback: () => unknown): () => undefined {
  const mediaQueryHidden = window.matchMedia(`(min-width: ${BREAKPOINT_HIDDEN}px)`)
  const mediaQueryForcedCollapsed = window.matchMedia(
    `(min-width: ${BREAKPOINT_FORCED_COLLAPSED}px)`
  )

  mediaQueryHidden.addEventListener("change", callback)
  mediaQueryForcedCollapsed.addEventListener("change", callback)

  return () => {
    mediaQueryHidden.removeEventListener("change", callback)
    mediaQueryForcedCollapsed.removeEventListener("change", callback)
  }
}

interface SidebarStateValue {
  isCollapsed: boolean
  isHydrated: boolean
  isHidden: boolean
  isForcedCollapsed: boolean
  effectiveIsCollapsed: boolean
  toggleCollapsed: () => undefined
  setCollapsed: (collapsed: boolean) => undefined
}

export const SidebarStateContext = createContext<SidebarStateValue | null>(null)

export function useSidebarStateProvider(): SidebarStateValue {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  const viewportWidth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const isHidden = viewportWidth < BREAKPOINT_HIDDEN
  const isForcedCollapsed =
    viewportWidth >= BREAKPOINT_HIDDEN && viewportWidth < BREAKPOINT_FORCED_COLLAPSED
  const effectiveIsCollapsed = isCollapsed || isForcedCollapsed

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) {
      setIsCollapsed(stored === "true")
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    const root = document.documentElement
    if (isHidden) {
      delete root.dataset.sidebar
    } else {
      root.dataset.sidebar = effectiveIsCollapsed ? "collapsed" : "expanded"
    }
    root.dataset.sidebarReady = ""
  }, [isHydrated, isHidden, effectiveIsCollapsed])

  const toggleCollapsed = useCallback((): undefined => {
    setIsCollapsed((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, String(next))
      return next
    })
  }, [])

  const setCollapsed = useCallback((collapsed: boolean): undefined => {
    setIsCollapsed(collapsed)
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  }, [])

  return useMemo(
    () => ({
      isCollapsed,
      isHydrated,
      isHidden,
      isForcedCollapsed,
      effectiveIsCollapsed,
      toggleCollapsed,
      setCollapsed,
    }),
    [
      isCollapsed,
      isHydrated,
      isHidden,
      isForcedCollapsed,
      effectiveIsCollapsed,
      toggleCollapsed,
      setCollapsed,
    ]
  )
}

export function useSidebarState(): SidebarStateValue {
  const context = useContext(SidebarStateContext)
  if (!context) {
    throw new Error("useSidebarState must be used within a SidebarStateProvider")
  }
  return context
}
