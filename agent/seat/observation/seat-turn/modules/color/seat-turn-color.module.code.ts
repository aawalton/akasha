import type { SeatTurnState } from "akasha/agent/seat/observation/seat-turn/modules/state/seat-turn-state.module.code.ts"
import { listedAt } from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { akashaValuesAt } from "akasha/pages/modules/akasha-page-values/akasha-page-values.module.code.ts"
import { akashaRoot } from "akasha/pages/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugOf } from "akasha/pages/modules/value-reading/page-value-reading.module.code.ts"

const PAGE_TYPE = "seat-turn-state"

const COLOR_KEY = "color"

function pageOfState(akasha: string, state: SeatTurnState): string | null {
  return listedAt(akasha, PAGE_TYPE, state)[0]?.path ?? null
}

function colorStatedOn(akasha: string, state: SeatTurnState): string | null {
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
  return typeof color === "string" && color !== "" ? slugOf(color) : null
}

export function colorOfState(state: SeatTurnState, akasha?: string): string | null {
  return colorStatedOn(akasha ?? akashaRoot(), state)
}
