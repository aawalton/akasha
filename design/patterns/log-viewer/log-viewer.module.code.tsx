"use client"

import { cn } from "@akasha/design-primitives/cn"
import { ScrollArea } from "@akasha/design-primitives/scroll-area"
import { Spinner } from "@akasha/design-primitives/spinner"
import Convert from "ansi-to-html"
import { useEffect, useMemo, useRef, useState } from "react"

interface LogViewerProps {
  logs: string
  autoScroll?: boolean
  maxHeight?: string
  loading?: boolean
  emptyMessage?: string
  className?: string
}

const converter = new Convert({ escapeXML: true })

function LogViewer({
  logs,
  autoScroll = true,
  maxHeight = "500px",
  loading = false,
  emptyMessage = "No logs available",
  className,
}: LogViewerProps) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const [userScrolledUp, setUserScrolledUp] = useState(false)

  const lines = useMemo(() => {
    if (logs === "") return []
    return logs.split("\n").map((line) => converter.toHtml(line))
  }, [logs])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !autoScroll) return

    function handleScroll() {
      if (!viewport) return
      const { scrollTop, scrollHeight, clientHeight } = viewport
      const atBottom = scrollHeight - scrollTop - clientHeight < 20
      setUserScrolledUp(!atBottom)
    }

    viewport.addEventListener("scroll", handleScroll, { passive: true })
    return () => viewport.removeEventListener("scroll", handleScroll)
  }, [autoScroll])

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || !autoScroll || userScrolledUp) return
    viewport.scrollTop = viewport.scrollHeight
  }, [logs, autoScroll, userScrolledUp])

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const viewport = wrapper
      .closest('[data-slot="scroll-area"]')
      ?.querySelector('[data-slot="scroll-area-viewport"]')
    if (viewport instanceof HTMLDivElement) {
      viewportRef.current = viewport
    }
  }, [])

  if (loading) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-100",
          className
        )}
        style={{ maxHeight }}
      >
        <Spinner className="size-6 text-neutral-400" />
      </div>
    )
  }

  if (logs === "") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-neutral-400 text-sm",
          className
        )}
        style={{ maxHeight }}
      >
        {emptyMessage}
      </div>
    )
  }

  return (
    <ScrollArea
      className={cn(
        "rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-100",
        className
      )}
      style={{ maxHeight }}
    >
      <div ref={wrapperRef} className="p-4 font-mono text-sm">
        {lines.map((html, i) => (
          <div key={i} className="whitespace-pre-wrap leading-relaxed">
            <span className="inline-block min-w-[3ch] select-none pr-4 text-right text-neutral-500">
              {i + 1}
            </span>
            <span dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export { LogViewer, type LogViewerProps }
