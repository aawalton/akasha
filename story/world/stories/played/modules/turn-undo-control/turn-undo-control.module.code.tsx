"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { overServer } from "akasha/page/access/modules/over-server/over-server.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import { askingFor } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import { useEffect, useState } from "react"

const STORY = "story-played"

const EXTERNAL_ID = "externalId"

const ASKED = "turnUndo"

const REFUSED = "turnUndoRefused"

const TURN_OPENS = "story-turn-played/"

const POLL_MS = 3000

const GIVEN_UP_MS = 3 * 60_000

const SLOW = "The game did not answer in time, so nothing was undone yet."

const UNSENT = "The ask to undo the turn did not reach the game."

const NOTE_LINE = "font-mono text-[12px] text-tertiary"

const ERROR_LINE = "font-mono text-[12px] text-red"

export type UndoKind = "cancel" | "take-back"

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

export function undoPatchOf(gameExternalId: string, turn: string) {
  return {
    pageTypeSlug: STORY,
    where: [{ key: EXTERNAL_ID, eq: gameExternalId }],
    set: { [ASKED]: `${TURN_OPENS}${turn}` },
  }
}

export type UndoHeard =
  | { readonly heard: false }
  | { readonly heard: true; readonly refused: string | null }

export function undoHeardIn(row: Row | undefined, turn: string): UndoHeard {
  if (row === undefined || row[ASKED] === `${TURN_OPENS}${turn}`) return { heard: false }
  const said = row[REFUSED]
  return { heard: true, refused: typeof said === "string" && said !== "" ? said : null }
}

type Step = "offered" | "confirming" | "asking"

export function TurnUndo({
  gameExternalId,
  turn,
  kind,
  onUndone,
}: {
  readonly gameExternalId: string
  readonly turn: string
  readonly kind: UndoKind
  readonly onUndone: () => void
}) {
  const [step, setStep] = useState<Step>("offered")
  const [refused, setRefused] = useState<string | null>(null)
  const words = UNDO_WORDS[kind]
  useEffect(() => {
    if (step !== "asking") return
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
          setStep("offered")
          if (heard.refused === null) onUndone()
        } else if (Date.now() - started > GIVEN_UP_MS) {
          setRefused(SLOW)
          setStep("offered")
        }
      })
    }, POLL_MS)
    return () => clearInterval(timer)
  }, [step, gameExternalId, turn, onUndone])
  const ask = () => {
    setRefused(null)
    setStep("asking")
    overServer("patchPage", undoPatchOf(gameExternalId, turn)).catch(() => {
      setRefused(UNSENT)
      setStep("offered")
    })
  }
  return (
    <div className="flex flex-col gap-1">
      {step === "confirming" ? (
        <div className="flex flex-wrap items-center gap-2">
          <p className={NOTE_LINE}>{words.ask}</p>
          <Button type="button" variant="destructive" size="xs" onClick={ask}>
            {words.yes}
          </Button>
          <Button type="button" variant="tertiary" size="xs" onClick={() => setStep("offered")}>
            Keep it
          </Button>
        </div>
      ) : (
        <div>
          <Button
            type="button"
            variant="tertiary"
            size="xs"
            disabled={step === "asking"}
            aria-busy={step === "asking"}
            onClick={() => setStep("confirming")}
          >
            {step === "asking" ? "Undoing…" : words.offer}
          </Button>
        </div>
      )}
      {refused === null ? null : <p className={ERROR_LINE}>{refused}</p>}
    </div>
  )
}
