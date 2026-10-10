"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { PagesUILink } from "akasha/page/ui/modules/navigation-context/navigation-context.module.code.tsx"
import {
  chapterHref,
  SKIP_SECONDS,
  speedShown,
} from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"
import { useNarration } from "akasha/story/chapter/narration/modules/player/narration-player.module.code.tsx"
import { Pause, Play, RotateCcw, RotateCw, X } from "lucide-react"
import { type RefObject, useLayoutEffect, useRef } from "react"

const BAR =
  "fixed right-0 top-0 z-40 border-primary/10 border-b px-3 pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] pb-2"

const TOP_OFFSET = "--safe-area-top"

function useTopOffset(bar: RefObject<HTMLElement | null>, shown: boolean): undefined {
  useLayoutEffect(() => {
    const element = bar.current
    if (!shown || element === null) return
    const root = document.documentElement
    const held = (): undefined => {
      root.style.setProperty(TOP_OFFSET, `${element.getBoundingClientRect().height}px`)
    }
    held()
    const watching = new ResizeObserver(held)
    watching.observe(element)
    return () => {
      watching.disconnect()
      root.style.removeProperty(TOP_OFFSET)
    }
  }, [bar, shown])
}

function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(whole / 60)
  return `${minutes}:${String(whole % 60).padStart(2, "0")}`
}

export function NarrationBar() {
  const narration = useNarration()
  const bar = useRef<HTMLElement>(null)
  const showing = narration !== null && narration.shown.kind !== "idle"
  useTopOffset(bar, showing)
  if (narration === null || narration.shown.kind === "idle") return null
  const { shown, chapter, halted, at, end } = narration
  const failed = shown.kind === "failed"
  const title = chapter?.title ?? "Narration"
  const below =
    shown.kind === "failed"
      ? shown.error
      : narration.reconnecting
        ? "Reconnecting…"
        : shown.kind === "opening"
          ? "Opening the narration…"
          : (chapter?.storyTitle ?? "")

  return (
    <section
      ref={bar}
      aria-label="Narration"
      data-slot="narration-bar"
      className={cn(BAR, surfaceClass(1))}
    >
      <div className="mx-auto flex max-w-[68ch] items-center gap-2">
        <div className="min-w-0 flex-1">
          {chapter === null ? (
            <p className="truncate font-medium text-primary text-sm">{title}</p>
          ) : (
            <PagesUILink
              href={chapterHref(chapter)}
              className="block truncate font-medium text-primary text-sm hover:underline"
            >
              {title}
            </PagesUILink>
          )}
          <p className={cn("truncate text-xs", failed ? "text-red" : "text-tertiary")}>{below}</p>
        </div>
        {failed ? (
          <Button type="button" variant="accent" size="sm" onClick={() => narration.retry()}>
            Retry
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="tertiary"
              size="icon-sm"
              aria-label={`Back ${SKIP_SECONDS} seconds`}
              onClick={() => narration.skip(-SKIP_SECONDS)}
            >
              <RotateCcw />
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="icon"
              aria-label={halted ? "Play" : "Pause"}
              disabled={shown.kind === "opening"}
              onClick={() => narration.toggle()}
            >
              {halted ? <Play /> : <Pause />}
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="icon-sm"
              aria-label={`Forward ${SKIP_SECONDS} seconds`}
              onClick={() => narration.skip(SKIP_SECONDS)}
            >
              <RotateCw />
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="sm"
              className="min-w-11 px-1.5 tabular-nums"
              aria-label={`Speed ${speedShown(narration.speed)}, tap for faster`}
              onClick={() => narration.faster()}
            >
              {speedShown(narration.speed)}
            </Button>
          </>
        )}
        <Button
          type="button"
          variant="tertiary"
          size="icon-sm"
          aria-label="Close narration"
          onClick={() => narration.close()}
        >
          <X />
        </Button>
      </div>
      {shown.kind === "playing" && (
        <div className="mx-auto mt-1 flex max-w-[68ch] items-center gap-2 text-[11px] text-tertiary tabular-nums">
          <span>{clock(at)}</span>
          <input
            type="range"
            aria-label="Narration position"
            className="h-1 flex-1 accent-[var(--color-accent)]"
            min={0}
            max={Math.max(end, at)}
            step={1}
            value={at}
            onChange={(event) => narration.seek(Number(event.currentTarget.value))}
          />
          <span>{clock(Math.max(end, at))}</span>
        </div>
      )}
    </section>
  )
}
