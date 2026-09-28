"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import {
  PagesUILink,
  usePagesUIRouter,
} from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import { ArrowLeft } from "lucide-react"
import { createContext, type ReactNode, useContext } from "react"
import { createPortal } from "react-dom"

export const FrameHeaderActionAt = createContext<HTMLElement | null>(null)

export function FrameHeaderAction({ children }: { children: ReactNode }) {
  const at = useContext(FrameHeaderActionAt)
  return at === null ? null : createPortal(<span className="contents">{children}</span>, at)
}

export interface FrameHeader {
  readonly title?: string
  readonly titleHref?: string | null
  readonly titleClassName?: string | null
  readonly columnClassName?: string | null
  readonly showBack?: boolean
  readonly mobileOnly?: boolean
  readonly menu?: ReactNode
}

export function FrameStickyHeader({
  header,
  actionAt,
}: {
  header: FrameHeader
  actionAt?: (at: HTMLElement | null) => void
}) {
  const router = usePagesUIRouter()
  const title = header.title ?? ""

  function onBack() {
    const canGoBack = typeof window !== "undefined" && window.history.length > 1
    if (canGoBack) window.history.back()
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
        header.mobileOnly === true && "min-[584px]:hidden",
        surfaceClass(0)
      )}
    >
      {}
      <div className="grid h-11 grid-cols-[auto_1fr_auto] items-center gap-2 px-4 min-[584px]:hidden">
        {header.showBack === true ? (
          <button
            type="button"
            aria-label="Back"
            onClick={onBack}
            className="-ml-1.5 flex h-11 w-11 items-center justify-center rounded-md text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="h-8 w-8" aria-hidden />
        )}
        <h1
          className={cn(
            "min-w-0 text-center font-display font-semibold text-base text-primary",
            header.titleClassName
          )}
        >
          {titleNode}
        </h1>
        <div className="flex h-8 min-w-8 items-center justify-end gap-1">
          {header.menu}
          <span ref={actionAt} className="contents" />
        </div>
      </div>
      {}
      {header.mobileOnly === true ? null : (
        <div
          className={cn(
            "hidden h-12 items-center justify-between gap-2 px-4 min-[584px]:flex",
            header.columnClassName
          )}
        >
          <h1
            className={cn(
              "min-w-0 font-display font-semibold text-lg text-primary",
              header.titleClassName
            )}
          >
            {titleNode}
          </h1>
          {header.menu}
        </div>
      )}
    </header>
  )
}
