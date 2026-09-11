import { akashaValuesAt } from "akasha/pages/akasha-page-values/akasha-page-values.module.code.ts"
import { akashaRoot } from "akasha/pages/checkout-roots/checkout-roots.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { SeatTurnState } from "akasha/seat-system/seat-turn-state/seat-turn-state.module.code.ts"

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
