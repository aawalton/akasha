import type { SeatTurnState } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaValuesAt } from "akasha/page/modules/akasha-page-values/akasha-page-values.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

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
