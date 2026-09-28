"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { FrameHeaderAction } from "akasha/page/ui/frame/modules/frame-sticky-header/frame-sticky-header.module.code.tsx"
import { BookOpen, PanelRight } from "lucide-react"
import { type ReactNode, type RefCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"

const WIDE_PAGE =
  "mx-auto flex w-full max-w-[1100px] flex-col gap-6 px-6 pt-3 pb-12 min-[584px]:pt-6"

export const NARROW_PAGE =
  "mx-auto flex w-full max-w-[820px] flex-col gap-6 px-6 pt-3 pb-12 min-[584px]:pt-6"

const RUN_WITH_PANELS = "grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]"

const RUN_ALONE = "flex flex-col gap-6"

const RUN_COLUMN = "flex min-w-0 flex-col gap-6"

const RUN_TEXT = "flex min-w-0 flex-col gap-6"

const RUN_TEXT_SET_ASIDE = "hidden min-w-0 flex-col gap-6 min-[584px]:flex"

const PANELS_ASIDE = "hidden flex-col gap-4 lg:sticky lg:self-start min-[584px]:flex"

const PANELS_SHOWN = "flex flex-col gap-4 max-[583px]:order-first lg:sticky lg:self-start"

const STUCK_AT_TOP = "lg:top-6"

const STUCK_UNDER_HEADER = "lg:top-[calc(var(--safe-area-top)+4.5rem)]"

const PANELS_FLAT =
  "max-[583px]:**:data-[surface=1]:rounded-none max-[583px]:**:data-[surface=1]:bg-transparent max-[583px]:**:data-[surface=1]:px-0 max-[583px]:**:data-[surface=1]:shadow-none"

const PANELS_TOGGLE = "min-[584px]:hidden"

const ASIDE_UNDRAWN = "hidden"

function useDrawsAnything(): readonly [RefCallback<HTMLElement>, boolean] {
  const [at, setAt] = useState<HTMLElement | null>(null)
  const [draws, setDraws] = useState(false)
  useEffect(() => {
    if (at === null) {
      setDraws(false)
      return
    }
    const judge = () => setDraws(at.hasChildNodes())
    judge()
    const watch = new MutationObserver(judge)
    watch.observe(at, { childList: true })
    return () => watch.disconnect()
  }, [at])
  return [setAt, draws]
}

function asideClass(wide: boolean, showing: boolean, underHeader: boolean): string {
  if (!wide) return ASIDE_UNDRAWN
  const stuck = underHeader ? STUCK_UNDER_HEADER : STUCK_AT_TOP
  return `${showing ? PANELS_SHOWN : PANELS_ASIDE} ${stuck} ${PANELS_FLAT}`
}

export function PlayedLayout({
  head,
  panelsAbove,
  runDrawn,
  bar,
  panelsAside,
  underHeader = false,
}: {
  head: ReactNode
  panelsAbove: ReactNode
  runDrawn: ReactNode
  bar?: ReactNode
  panelsAside: ReactNode | null
  underHeader?: boolean
}) {
  const [asideAt, asideDraws] = useDrawsAnything()
  const [panelsChosen, setPanelsChosen] = useState(false)
  const textAt = useRef(0)
  const wide = panelsAside !== null && asideDraws
  const showing = wide && panelsChosen
  useEffect(() => {
    if (!showing) return
    document.documentElement.dataset.panelsShown = ""
    return () => {
      delete document.documentElement.dataset.panelsShown
    }
  }, [showing])
  const toggle = () => {
    if (showing) {
      const at = textAt.current
      flushSync(() => setPanelsChosen(false))
      window.scrollTo(0, at)
      return
    }
    textAt.current = window.scrollY
    flushSync(() => setPanelsChosen(true))
    window.scrollTo(0, 0)
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)))
  }
  return (
    <div className={wide ? WIDE_PAGE : NARROW_PAGE}>
      {head}
      {wide ? (
        <FrameHeaderAction>
          <Button
            type="button"
            variant="tertiary"
            size="icon"
            className={PANELS_TOGGLE}
            aria-label="Panels"
            aria-pressed={showing}
            onClick={toggle}
          >
            {showing ? <BookOpen className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>
        </FrameHeaderAction>
      ) : null}
      <div className={wide ? RUN_WITH_PANELS : RUN_ALONE}>
        <div className={RUN_COLUMN}>
          <div className={showing ? RUN_TEXT_SET_ASIDE : RUN_TEXT}>
            {panelsAbove}
            {runDrawn}
          </div>
          {bar}
        </div>
        {panelsAside === null ? null : (
          <aside ref={asideAt} className={asideClass(wide, showing, underHeader)}>
            {panelsAside}
          </aside>
        )}
      </div>
    </div>
  )
}
