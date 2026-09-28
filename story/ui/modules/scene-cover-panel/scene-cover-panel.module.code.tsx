"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "akasha/design/interface/primitive/modules/dialog/dialog.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import {
  coverSource,
  PageCover,
} from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  COVER_WIDTH_ASKED,
  latestTurnId,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import type { PlayedTurnCover } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { type ReactNode, useEffect, useRef, useState } from "react"

const ONE = 1

export type TurnCover = {
  readonly id: string
  readonly number: number
  readonly source: string
  readonly whole: string
}

export function turnCoversOf(turnCovers: readonly PlayedTurnCover[]): readonly TurnCover[] {
  const held: TurnCover[] = []
  for (const one of turnCovers) {
    const source = coverSource(one.cover, COVER_WIDTH_ASKED)
    const whole = coverSource(one.cover)
    if (source !== null && whole !== null) {
      held.push({ id: one.id, number: one.number, source, whole })
    }
  }
  return held
}

export type Paged = { readonly from: string; readonly to: string }

export function pickedFor(paged: Paged | null, latest: string): string | null {
  return paged !== null && paged.from === latest ? paged.to : null
}

export function pagedAt(covers: readonly TurnCover[], picked: string | null): number {
  const at = picked === null ? -1 : covers.findIndex((one) => one.id === picked)
  return at === -1 ? covers.length - 1 : at
}

export type Step = "first" | "earlier" | "later" | "last"

export function steppedTo(
  covers: readonly TurnCover[],
  at: number,
  step: Step
): TurnCover | undefined {
  const to = { first: 0, earlier: at - ONE, later: at + ONE, last: covers.length - ONE }[step]
  return to === at ? undefined : covers[to]
}

export function keyStep(key: string): Step | null {
  if (key === "ArrowLeft") return "earlier"
  if (key === "ArrowRight") return "later"
  if (key === "Home") return "first"
  if (key === "End") return "last"
  return null
}

type StepButton = { readonly step: Step; readonly label: string; readonly icon: ReactNode }

const BEFORE: readonly StepButton[] = [
  { step: "first", label: "First turn", icon: <ChevronsLeft aria-hidden /> },
  { step: "earlier", label: "Earlier turn", icon: <ChevronLeft aria-hidden /> },
]

const AFTER: readonly StepButton[] = [
  { step: "later", label: "Later turn", icon: <ChevronRight aria-hidden /> },
  { step: "last", label: "Latest turn", icon: <ChevronsRight aria-hidden /> },
]

type ScenePanelProps = {
  readonly turns: readonly ClientStoryTurn[]
  readonly turnCovers: readonly PlayedTurnCover[]
}

export function SceneCoverPanel({ turns, turnCovers }: ScenePanelProps) {
  const turnId = latestTurnId(turns)
  const [paged, setPaged] = useState<Paged | null>(null)
  const [viewing, setViewing] = useState(false)
  const stepping = useRef<(step: Step) => void>(() => undefined)
  useEffect(() => {
    if (!viewing) return
    const onKey = (event: KeyboardEvent) => {
      const step = keyStep(event.key)
      if (step === null) return
      event.preventDefault()
      stepping.current(step)
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [viewing])
  const covers = turnCoversOf(turnCovers)
  if (turnId === null || covers.length === 0) return null
  const at = pagedAt(covers, pickedFor(paged, turnId))
  const shown = covers[at]
  if (shown === undefined) return null
  const stepped = ({ step, label, icon }: StepButton) => {
    const to = steppedTo(covers, at, step)
    return (
      <Button
        key={step}
        variant="secondary"
        size="icon-sm"
        aria-label={label}
        disabled={to === undefined}
        onClick={() => {
          if (to !== undefined) setPaged({ from: turnId, to: to.id })
        }}
      >
        {icon}
      </Button>
    )
  }
  const goTo = (step: Step) => {
    const to = steppedTo(covers, at, step)
    if (to !== undefined) setPaged({ from: turnId, to: to.id })
  }
  stepping.current = goTo
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <Dialog open={viewing} onOpenChange={setViewing}>
        <DialogContent
          variant="bare"
          showCloseButton
          className="max-h-[95vh] w-auto items-center sm:max-w-[95vw] [&>[data-slot=dialog-close]]:rounded-full [&>[data-slot=dialog-close]]:bg-black/60 [&>[data-slot=dialog-close]]:p-2 [&>[data-slot=dialog-close]]:text-white"
        >
          <DialogTitle className="sr-only">Turn {shown.number}</DialogTitle>
          <img
            src={shown.whole}
            alt={`Turn ${shown.number}`}
            className="block max-h-[95vh] max-w-[95vw] rounded-md object-contain"
          />
        </DialogContent>
      </Dialog>
      <figure className="flex flex-col gap-2">
        <button
          type="button"
          aria-label={`View turn ${shown.number} full size`}
          className="cursor-zoom-in rounded-md"
          onClick={() => setViewing(true)}
        >
          <PageCover coverUrl={shown.source} />
        </button>
        {covers.length > ONE ? (
          <figcaption className="flex items-center justify-between">
            <span className="flex gap-1">{BEFORE.map(stepped)}</span>
            <span className="font-mono text-[12px] text-secondary">Turn {shown.number}</span>
            <span className="flex gap-1">{AFTER.map(stepped)}</span>
          </figcaption>
        ) : null}
      </figure>
    </SurfaceProvider>
  )
}
