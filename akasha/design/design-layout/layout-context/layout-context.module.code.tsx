"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { computeColumnCount } from "../layout-data/layout-data.module.code.ts"

interface LayoutContextValue {
  columnCount: number | null
}

const LayoutContext = React.createContext<LayoutContextValue | null>(null)

export function useLayoutContext() {
  return React.useContext(LayoutContext)
}

interface LayoutProviderProps {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLElement | null>
  ready?: boolean
}

export function LayoutProvider({ children, containerRef, ready = true }: LayoutProviderProps) {
  const [columnCount, setColumnCount] = React.useState<number | null>(null)
  const columnCountRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    if (!ready) return
    const container = containerRef.current
    if (!container) return

    let isMarginTransitioning = false

    const updateColumnCount = () => {
      const newCount = computeColumnCount(container.clientWidth)
      const prevCount = columnCountRef.current
      columnCountRef.current = newCount

      if (prevCount !== null && prevCount !== newCount && document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(() => setColumnCount(newCount))
        })
      } else {
        setColumnCount(newCount)
      }
    }

    const handleResize = () => {
      if (isMarginTransitioning) return
      updateColumnCount()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)
    updateColumnCount()

    const handleTransitionStart = (event: TransitionEvent) => {
      if (event.target === container && event.propertyName.startsWith("margin")) {
        isMarginTransitioning = true
      }
    }

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === container && event.propertyName.startsWith("margin")) {
        isMarginTransitioning = false
        updateColumnCount()
      }
    }

    container.addEventListener("transitionstart", handleTransitionStart)
    container.addEventListener("transitionend", handleTransitionEnd)
    container.addEventListener("transitioncancel", handleTransitionEnd)

    return () => {
      resizeObserver.disconnect()
      container.removeEventListener("transitionstart", handleTransitionStart)
      container.removeEventListener("transitionend", handleTransitionEnd)
      container.removeEventListener("transitioncancel", handleTransitionEnd)
    }
  }, [containerRef, ready])

  const value = React.useMemo(() => ({ columnCount }), [columnCount])

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}
