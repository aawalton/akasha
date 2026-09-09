import { listedAt } from "@akasha/indexes"
import { akashaValuesAt } from "@akasha/pages/akasha-page-values"
import { akashaRoot } from "@akasha/pages/checkout-roots"
import type { SeatTurnState } from "../seat-turn-state/seat-turn-state.module.code.ts"

const PAGE_TYPE = "seat-turn-state"

const COLOR_KEY = "color"

export function pageOfState(akasha: string, state: SeatTurnState): string | null {
  return listedAt(akasha, PAGE_TYPE, state)[0]?.path ?? null
}

export function colorStatedOn(akasha: string, state: SeatTurnState): string | null {
  let values: Readonly<Record<string, unknown>> | null
  try {
    const at = pageOfState(akasha, state)
    if (at === null) return null
    values = akashaValuesAt(akasha, at)
  } catch {
    return null
  }
  if (values === null) return null
  const color = values[COLOR_KEY]
  return typeof color === "string" && color !== "" ? color : null
}

export function colorOfState(state: SeatTurnState, akasha?: string): string | null {
  return colorStatedOn(akasha ?? akashaRoot(), state)
}
