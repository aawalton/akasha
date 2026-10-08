import "akasha/temper/addon/type/temper-global/temper-global.type-declaration.d.ts"

import {
  LIVE_FIGURE_KEYS,
  type LiveFigureTexts,
  liveFigureCell,
  liveFigureOrder,
} from "akasha/temper/addon/pages/combat/modules/combat-live-figures/combat-live-figures.module.code.ts"
import { getDb } from "akasha/temper/addon/pages/combat/modules/combat-saved-variables/combat-saved-variables.module.code.ts"

let lastTexts: LiveFigureTexts | undefined

export function noteLiveFigures(texts: LiveFigureTexts): undefined {
  lastTexts = texts
  return undefined
}

export function registerLiveHudFields(): undefined {
  for (const key of LIVE_FIGURE_KEYS) {
    globalThis.Temper?.registerField({
      id: `combat:${key}`,
      order: liveFigureOrder(key),
      compute: () => liveFigureCell(key, getDb().liveReport, lastTexts),
    })
  }
  return undefined
}
