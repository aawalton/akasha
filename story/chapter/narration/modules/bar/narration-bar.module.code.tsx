"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { SKIP_SECONDS } from "akasha/story/chapter/narration/modules/listening/narration-listening.module.code.ts"
import { useNarration } from "akasha/story/chapter/narration/modules/player/narration-player.module.code.tsx"
import { Pause, Play, RotateCcw, RotateCw, X } from "lucide-react"

const BAR =
  "fixed inset-x-0 bottom-[calc(var(--safe-area-bottom)+var(--bottom-nav-height))] z-40 border-primary/10 border-t px-3 py-2 min-[584px]:bottom-0 min-[584px]:pb-[calc(var(--safe-area-bottom)+0.5rem)]"

function clock(seconds: number): string {
  const whole = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(whole / 60)
  return `${minutes}:${String(whole % 60).padStart(2, "0")}`
}

export function NarrationBar() {
  const narration = useNarration()
  if (narration === null || narration.shown.kind === "idle") return null
  const { shown, chapter, halted, at, end } = narration
  const failed = shown.kind === "failed"
  const title = chapter?.title ?? "Narration"
  const below =
    shown.kind === "failed"
      ? shown.error
      : shown.kind === "opening"
        ? "Opening the narration…"
        : (chapter?.storyTitle ?? "")

  return (
    <section aria-label="Narration" className={cn(BAR, surfaceClass(1))}>
      <div className="mx-auto flex max-w-[68ch] items-center gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-primary text-sm">{title}</p>
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
