"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "akasha/design/interface/primitive/modules/alert-dialog/alert-dialog.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { DropdownMenuItem } from "akasha/design/interface/primitive/modules/dropdown-menu/dropdown-menu.module.code.tsx"
import { overServer } from "akasha/page/access/modules/over-server/over-server.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { type ReactNode, useEffect, useMemo, useState } from "react"

const STORY = "story-played"

const EXTERNAL_ID = "externalId"

const ASKED = "turnUndo"

const REFUSED = "turnUndoRefused"

const TURN_OPENS = "story-turn-played/"

const POLL_MS = 3000

const GIVEN_UP_MS = 3 * 60_000

const SLOW = "The game did not answer in time, so nothing was undone yet."

const UNSENT = "The ask to undo the turn did not reach the game."

const ERROR_LINE = "font-mono text-[12px] text-red"

type UndoKind = "cancel" | "take-back"

type UndoOffer = { readonly turn: string; readonly kind: UndoKind }

export const UNDO_WORDS: Readonly<
  Record<UndoKind, { readonly offer: string; readonly ask: string; readonly yes: string }>
> = {
  cancel: {
    offer: "Cancel this turn",
    ask: "Cancel this turn? The work on it is thrown away, and your action comes back to the box.",
    yes: "Yes, cancel it",
  },
  "take-back": {
    offer: "Take back the last turn",
    ask: "Take back the last turn? It is undone, and your action comes back to the box.",
    yes: "Yes, take it back",
  },
}

export function undoOffered(
  making: string | null,
  latest: string | null,
  waiting: boolean
): UndoOffer | null {
  if (making !== null) return { turn: making, kind: "cancel" }
  if (latest !== null && !waiting) return { turn: latest, kind: "take-back" }
  return null
}

export function undoPatchOf(gameExternalId: string, turn: string) {
  return {
    pageTypeSlug: STORY,
    where: [{ key: EXTERNAL_ID, eq: gameExternalId }],
    set: { [ASKED]: `${TURN_OPENS}${turn}` },
  }
}

type UndoHeard =
  | { readonly heard: false }
  | { readonly heard: true; readonly refused: string | null }

export function undoHeardIn(row: Row | undefined, turn: string): UndoHeard {
  if (row === undefined || row[ASKED] === `${TURN_OPENS}${turn}`) return { heard: false }
  const said = row[REFUSED]
  return { heard: true, refused: typeof said === "string" && said !== "" ? said : null }
}

type Step = "closed" | "confirming" | "asking"

type TurnUndo = { readonly item: ReactNode; readonly dialog: ReactNode }

export function useTurnUndo({
  gameExternalId,
  offer,
  onUndone,
}: {
  readonly gameExternalId: string | null
  readonly offer: UndoOffer | null
  readonly onUndone: () => void
}): TurnUndo {
  const [step, setStep] = useState<Step>("closed")
  const [refused, setRefused] = useState<string | null>(null)
  const [asked, setAsked] = useState<UndoOffer | null>(null)
  const turn = asked?.turn ?? null
  useEffect(() => {
    if (step !== "asking" || gameExternalId === null || turn === null) return
    const started = Date.now()
    const timer = setInterval(() => {
      void askingFor({
        pageTypeSlug: STORY,
        where: { [EXTERNAL_ID]: { is: gameExternalId } },
        keys: [ASKED, REFUSED],
      }).then((answered) => {
        if ("refused" in answered) return
        const heard = undoHeardIn(answered.rows[0], turn)
        if (heard.heard) {
          setRefused(heard.refused)
          if (heard.refused === null) {
            setStep("closed")
            onUndone()
          } else {
            setStep("confirming")
          }
        } else if (Date.now() - started > GIVEN_UP_MS) {
          setRefused(SLOW)
          setStep("confirming")
        }
      })
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [step, gameExternalId, turn, onUndone])
  const offerTurn = offer?.turn ?? null
  const offerKind = offer?.kind ?? null
  const item = useMemo(() => {
    if (gameExternalId === null || offerTurn === null || offerKind === null) return null
    return (
      <DropdownMenuItem
        variant="destructive"
        onSelect={() => {
          setRefused(null)
          setAsked({ turn: offerTurn, kind: offerKind })
          setStep("confirming")
        }}
      >
        {UNDO_WORDS[offerKind].offer}
      </DropdownMenuItem>
    )
  }, [gameExternalId, offerTurn, offerKind])
  const words = asked === null ? null : UNDO_WORDS[asked.kind]
  const ask = () => {
    if (gameExternalId === null || turn === null) return
    setRefused(null)
    setStep("asking")
    overServer("patchPage", undoPatchOf(gameExternalId, turn)).catch(() => {
      setRefused(UNSENT)
      setStep("confirming")
    })
  }
  const dialog =
    words === null ? null : (
      <AlertDialog
        open={step !== "closed"}
        onOpenChange={(open) => {
          if (!open && step !== "asking") setStep("closed")
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{words.offer}</AlertDialogTitle>
            <AlertDialogDescription>{words.ask}</AlertDialogDescription>
          </AlertDialogHeader>
          {refused === null ? null : <p className={ERROR_LINE}>{refused}</p>}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={step === "asking"}>Keep it</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={step === "asking"}
              aria-busy={step === "asking"}
              onClick={ask}
            >
              {step === "asking" ? "Undoing…" : words.yes}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  return { item, dialog }
}
