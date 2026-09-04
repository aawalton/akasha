"use client"

import { buttonVariants } from "@akasha/design-primitives/button"
import { cn } from "@akasha/design-primitives/cn"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { PagesUILink } from "@akasha/pages-ui/navigation-context"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"

export interface ReaderNeighborLink {
  readonly href: string
  readonly title: string | null
}

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      setProgress(scrollable > 0 ? Math.min(1, doc.scrollTop / scrollable) : 0)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div
      data-slot="reader-reading-progress"
      className="fixed inset-x-0 top-0 z-10 h-0.5 bg-transparent"
    >
      <div
        className="h-full bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export function ReaderPager({
  prev,
  next,
  position = "bottom",
}: {
  prev: ReaderNeighborLink | null
  next: ReaderNeighborLink | null
  position?: "top" | "bottom"
}) {
  const surface = useSurface()
  const linkClass = cn(
    buttonVariants({ variant: "secondary", size: "lg" }),
    surfaceClass(surface + 1),
    "h-11 min-w-0 flex-1"
  )
  return (
    <nav aria-label={position === "top" ? "pagination top" : "pagination"} className="flex gap-3">
      {prev != null ? (
        <PagesUILink href={prev.href} className={linkClass}>
          <ChevronLeft aria-hidden />
          <span className="shrink-0">Previous</span>
          {prev.title != null && (
            <span className="hidden min-w-0 truncate font-normal text-tertiary sm:inline">
              {prev.title}
            </span>
          )}
        </PagesUILink>
      ) : (
        <span aria-hidden className="min-w-0 flex-1" />
      )}
      {next != null ? (
        <PagesUILink href={next.href} className={linkClass}>
          {next.title != null && (
            <span className="hidden min-w-0 truncate font-normal text-tertiary sm:inline">
              {next.title}
            </span>
          )}
          <span className="shrink-0">Next</span>
          <ChevronRight aria-hidden />
        </PagesUILink>
      ) : (
        <span aria-hidden className="min-w-0 flex-1" />
      )}
    </nav>
  )
}
