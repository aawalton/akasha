"use client"

import { type ReactNode, useEffect, useState } from "react"

type LoadingContainerProps = {
  loading: boolean
  fallback: ReactNode
  children: ReactNode
  delay?: number
  className?: string
  loadingLabel?: string
}

function LoadingContainer({
  loading,
  fallback,
  children,
  delay = 0,
  className,
  loadingLabel = "Loading content",
}: LoadingContainerProps) {
  const [showFallback, setShowFallback] = useState(delay === 0 && loading)

  useEffect(() => {
    if (!loading) {
      setShowFallback(false)
      return
    }

    if (delay === 0) {
      setShowFallback(true)
      return
    }

    const timer = setTimeout(() => {
      setShowFallback(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [loading, delay])

  return (
    <div data-slot="loading-container" aria-busy={loading} aria-live="polite" className={className}>
      {loading && <span className="sr-only">{loadingLabel}</span>}
      {loading && showFallback ? fallback : loading ? null : children}
    </div>
  )
}

export { LoadingContainer }
