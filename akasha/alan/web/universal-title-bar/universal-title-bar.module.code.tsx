"use client"

import { Button } from "@akasha/design-primitives/button"
import { gainedStars, sumOwnedRanks } from "@akasha/idle-system/accrual"
import { ASCEND_MIN } from "@akasha/idle-system/constants"
import { drawCost } from "@akasha/idle-system/gacha-state"
import { displayedResource, totalRate } from "@akasha/idle-system/rate"
import type { GameState } from "@akasha/idle-system/state"
import { formatShortNumber as fmt } from "@akasha/pages-core/property-types/number"
import { Heart, Sparkles } from "lucide-react"
import { useState } from "react"
import { deriveAscensionView } from "../idle-display/idle-display.module.code.ts"
import { runDraw } from "../idle-draw-verb/idle-draw-verb.module.code.ts"
import type { IdleActions } from "../use-idle-actions/use-idle-actions.module.code.ts"

export function UniversalTitleBar({
  state,
  now,
  actions,
}: {
  state: GameState
  now: number
  actions: IdleActions
}) {
  const [armed, setArmed] = useState(false)

  const moments = displayedResource(state, now)
  const rate = totalRate(state)
  const cost = drawCost(state)
  const affordable = moments >= cost

  const ascension = deriveAscensionView(state)
  const canAscend = ascension.locked === false && ascension.canAscend
  const ranks = sumOwnedRanks(state)
  const gain = gainedStars(state)

  const onAscend = (): undefined => {
    if (!armed) {
      setArmed(true)
      return
    }
    actions.ascend()
    setArmed(false)
  }

  return (
    <div className="idle-title-bar flex items-center gap-3">
      <div className="flex cursor-pointer select-text items-center gap-2 truncate font-bold text-2xl text-yellow transition-colors hover:text-accent">
        <span className="font-mono tabular-nums">{fmt(moments)}</span>
        <Heart className="size-6" aria-label="Moments" />
        <span className="font-mono tabular-nums">{`${fmt(rate)}/s`}</span>
      </div>
      <div className="flex-1" />
      <Button
        type="button"
        variant="secondary"
        className="text-yellow"
        disabled={!affordable}
        onClick={() => {
          if (affordable) void runDraw()
        }}
      >
        <Sparkles />
        {`Draw (${fmt(cost)})`}
      </Button>
      <Button type="button" variant="primary" disabled={!canAscend} onClick={onAscend}>
        {armed
          ? "Confirm — reset ranks"
          : canAscend
            ? `Ascend +${fmt(gain)}★`
            : `Ascend (${fmt(ranks)}/${fmt(ASCEND_MIN)})`}
      </Button>
    </div>
  )
}
