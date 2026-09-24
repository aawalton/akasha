"use client"

import { buttonVariants } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface ReaderNeighborLink {
  readonly href: string
  readonly title: string | null
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
