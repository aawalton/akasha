"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
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
import { type ReactNode, useState } from "react"

const ONE = 1

export type TurnCover = { readonly id: string; readonly number: number; readonly source: string }

export function turnCoversOf(turnCovers: readonly PlayedTurnCover[]): readonly TurnCover[] {
  const held: TurnCover[] = []
  for (const one of turnCovers) {
    const source = coverSource(one.cover, COVER_WIDTH_ASKED)
    if (source !== null) held.push({ id: one.id, number: one.number, source })
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
  return (
    <SurfaceProvider level={1} className="flex flex-col gap-3 rounded-xl p-4 shadow-sm">
      <figure className="flex flex-col gap-2">
        <PageCover coverUrl={shown.source} />
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
