"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { SurfaceProvider } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { overServer } from "akasha/page/access/modules/over-server/over-server.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import {
  coverSource,
  PageCover,
} from "akasha/page/ui/component/modules/page-cover/page-cover.module.code.tsx"
import {
  COVER_WIDTH_ASKED,
  latestTurnId,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import type { ClientStoryTurn } from "akasha/story/ui/modules/client-story-session/client-story-session.module.code.ts"
import { CoverDialog } from "akasha/story/ui/modules/cover-viewing/cover-viewing.module.code.tsx"
import type { PlayedTurnCover } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LoaderCircle,
  RotateCw,
} from "lucide-react"
import { type ReactNode, useEffect, useRef, useState } from "react"

const ONE = 1

const STORY = "story-played"

const EXTERNAL_ID = "externalId"

const ASKED = "coverReroll"

const REFUSED = "coverRerollRefused"

const POLL_MS = 4000

const GIVEN_UP_MS = 20 * 60_000

const SLOW = "The new picture took too long, so this one stays."

const UNSENT = "The ask to draw this picture again did not reach the game."

type TurnCover = {
  readonly id: string
  readonly number: number
  readonly cover: string
  readonly source: string
  readonly whole: string
}

export function turnCoversOf(turnCovers: readonly PlayedTurnCover[]): readonly TurnCover[] {
  const held: TurnCover[] = []
  for (const one of turnCovers) {
    const source = coverSource(one.cover, COVER_WIDTH_ASKED)
    const whole = coverSource(one.cover)
    if (source !== null && whole !== null) {
      held.push({ id: one.id, number: one.number, cover: one.cover, source, whole })
    }
  }
  return held
}

export function rerollAsked(gameExternalId: string, cover: string) {
  return {
    pageTypeSlug: STORY,
    where: [{ key: EXTERNAL_ID, eq: gameExternalId }],
    set: { [ASKED]: cover },
  }
}

type Settled =
  | { readonly settled: false }
  | { readonly settled: true; readonly refused: string | null }

export function rerollSettled(row: Row | undefined, cover: string): Settled {
  if (row === undefined || row[ASKED] === cover) return { settled: false }
  const refused = row[REFUSED]
  return { settled: true, refused: typeof refused === "string" && refused !== "" ? refused : null }
}

type Rerolling = {
  readonly asking: string | null
  readonly refused: string | null
  readonly ask: (cover: string) => undefined
}

function useReroll(gameExternalId: string | undefined): Rerolling {
  const [asking, setAsking] = useState<string | null>(null)
  const [refused, setRefused] = useState<string | null>(null)
  useEffect(() => {
    if (asking === null || gameExternalId === undefined) return
    const started = Date.now()
    const timer = setInterval(() => {
      void askingFor({
        pageTypeSlug: STORY,
        where: { [EXTERNAL_ID]: { is: gameExternalId } },
        keys: [ASKED, REFUSED],
      }).then((answered) => {
        if ("refused" in answered) return
        const settled = rerollSettled(answered.rows[0], asking)
        if (settled.settled) {
          setRefused(settled.refused)
          setAsking(null)
        } else if (Date.now() - started > GIVEN_UP_MS) {
          setRefused(SLOW)
          setAsking(null)
        }
      })
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [asking, gameExternalId])
  const ask = (cover: string): undefined => {
    if (asking !== null || gameExternalId === undefined) return
    setRefused(null)
    setAsking(cover)
    overServer("patchPage", rerollAsked(gameExternalId, cover)).catch(() => {
      setRefused(UNSENT)
      setAsking(null)
    })
    return undefined
  }
  return { asking, refused, ask }
}

function RerollButton({
  rerolling,
  cover,
}: {
  readonly rerolling: Rerolling
  readonly cover: string
}) {
  const busy = rerolling.asking !== null
  return (
    <Button
      variant="secondary"
      size="icon-sm"
      aria-label={busy ? "Drawing a new picture" : "Draw this picture again"}
      aria-busy={busy}
      disabled={busy}
      className="absolute top-2 left-2 rounded-full bg-black/60 text-white hover:bg-black/75"
      onClick={(event) => {
        event.stopPropagation()
        rerolling.ask(cover)
      }}
    >
      {busy ? <LoaderCircle aria-hidden className="animate-spin" /> : <RotateCw aria-hidden />}
    </Button>
  )
}

type Paged = { readonly from: string; readonly to: string }

export function pickedFor(paged: Paged | null, latest: string): string | null {
  return paged !== null && paged.from === latest ? paged.to : null
}

type Opening = "first" | "last"

export function pagedAt(
  covers: readonly TurnCover[],
  picked: string | null,
  opening: Opening = "last"
): number {
  const at = picked === null ? -1 : covers.findIndex((one) => one.id === picked)
  if (at !== -1) return at
  return opening === "first" ? 0 : covers.length - 1
}

type Step = "first" | "earlier" | "later" | "last"

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

type Noun = { readonly one: string; readonly title: string; readonly last: string }

const TURN: Noun = { one: "turn", title: "Turn", last: "Latest" }

const SCENE: Noun = { one: "scene", title: "Scene", last: "Last" }

function beforeOf(noun: Noun): readonly StepButton[] {
  return [
    { step: "first", label: `First ${noun.one}`, icon: <ChevronsLeft aria-hidden /> },
    { step: "earlier", label: `Earlier ${noun.one}`, icon: <ChevronLeft aria-hidden /> },
  ]
}

function afterOf(noun: Noun): readonly StepButton[] {
  return [
    { step: "later", label: `Later ${noun.one}`, icon: <ChevronRight aria-hidden /> },
    { step: "last", label: `${noun.last} ${noun.one}`, icon: <ChevronsRight aria-hidden /> },
  ]
}

type ScenePanelProps = {
  readonly turns: readonly ClientStoryTurn[]
  readonly turnCovers: readonly PlayedTurnCover[]
  readonly areScenes?: boolean | undefined
  readonly gameExternalId?: string | undefined
}

export function SceneCoverPanel({ turns, turnCovers, areScenes, gameExternalId }: ScenePanelProps) {
  const noun = areScenes === true ? SCENE : TURN
  const turnId = latestTurnId(turns)
  const [paged, setPaged] = useState<Paged | null>(null)
  const [viewing, setViewing] = useState(false)
  const rerolling = useReroll(gameExternalId)
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
  const at = pagedAt(covers, pickedFor(paged, turnId), areScenes === true ? "first" : "last")
  const shown = covers[at]
  if (shown === undefined) return null
  const rerollable = gameExternalId !== undefined
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
      <CoverDialog
        open={viewing}
        onOpenChange={setViewing}
        name={`${noun.title} ${shown.number}`}
        whole={shown.whole}
      >
        {rerollable ? <RerollButton rerolling={rerolling} cover={shown.cover} /> : null}
      </CoverDialog>
      <figure className="flex flex-col gap-2">
        <div className="relative">
          <button
            type="button"
            aria-label={`View ${noun.one} ${shown.number} full size`}
            className="block w-full cursor-zoom-in rounded-md"
            onClick={() => setViewing(true)}
          >
            <PageCover coverUrl={shown.source} />
          </button>
          {rerollable ? <RerollButton rerolling={rerolling} cover={shown.cover} /> : null}
        </div>
        {covers.length > ONE ? (
          <figcaption className="flex items-center justify-between">
            <span className="flex gap-1">{beforeOf(noun).map(stepped)}</span>
            <span className="font-mono text-[12px] text-secondary">
              {noun.title} {shown.number}
            </span>
            <span className="flex gap-1">{afterOf(noun).map(stepped)}</span>
          </figcaption>
        ) : null}
        {rerolling.refused === null ? null : (
          <p role="alert" className="text-[12px] text-secondary">
            {rerolling.refused}
          </p>
        )}
      </figure>
    </SurfaceProvider>
  )
}
