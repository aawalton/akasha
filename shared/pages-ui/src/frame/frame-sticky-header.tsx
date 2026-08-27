"use client"

import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { cn } from "@shared/design-primitives/utils/cn"
import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"
import { PagesUILink, usePagesUIRouter } from "../router-context"
import { decideBackNavigation } from "./back-navigation"

export interface FrameHeader {
  readonly title?: string
  readonly titleHref?: string | null
  readonly showBack?: boolean
  readonly menu?: ReactNode
}

export function FrameStickyHeader({ header }: { header: FrameHeader }) {
  const router = usePagesUIRouter()
  const title = header.title ?? ""

  function onBack() {
    const canGoBack = typeof window !== "undefined" && window.history.length > 1
    if (decideBackNavigation({ canGoBack }) === "back") window.history.back()
    else router.push("/")
  }

  const titleNode =
    header.titleHref != null && header.titleHref !== "" ? (
      <PagesUILink href={header.titleHref} className="truncate hover:underline">
        {title}
      </PagesUILink>
    ) : (
      <span className="truncate">{title}</span>
    )

  return (
    <header
      data-slot="frame-sticky-header"
      className={cn(
        "sticky top-(--safe-area-top) z-20 border-primary/10 border-b",
        surfaceClass(0)
      )}
    >
      {}
      <div className="grid h-12 grid-cols-[auto_1fr_auto] items-center gap-2 px-4 min-[584px]:hidden">
        {header.showBack === true ? (
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-md text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="h-8 w-8" aria-hidden />
        )}
        <h1 className="min-w-0 text-center font-display font-semibold text-base text-primary">
          {titleNode}
        </h1>
        <div className="flex h-8 w-8 items-center justify-center">{header.menu}</div>
      </div>
      {}
      <div className="hidden h-12 items-center justify-between gap-2 px-4 min-[584px]:flex">
        <h1 className="min-w-0 font-display font-semibold text-lg text-primary">{titleNode}</h1>
        {header.menu}
      </div>
    </header>
  )
}
