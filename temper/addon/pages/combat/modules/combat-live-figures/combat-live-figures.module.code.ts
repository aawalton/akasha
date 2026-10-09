type LiveFigureKey =
  | "damageOutSingle"
  | "damageOut"
  | "healOut"
  | "healOutAbsolute"
  | "damageIn"
  | "healIn"
  | "time"

export const LIVE_FIGURE_KEYS: readonly LiveFigureKey[] = [
  "damageOutSingle",
  "damageOut",
  "healOut",
  "healOutAbsolute",
  "damageIn",
  "healIn",
  "time",
]

export const FIRST_LIVE_FIGURE_ORDER = 70

export type LiveFigureTexts = Readonly<Record<LiveFigureKey, string>>

export type LiveFiguresShown = Readonly<Record<LiveFigureKey, boolean>>

interface LiveFigureCell {
  text: string
}

export function liveFigureOrder(key: LiveFigureKey): number {
  return FIRST_LIVE_FIGURE_ORDER + LIVE_FIGURE_KEYS.indexOf(key)
}

export function hasFightFigures(damageOut: number, healOut: number, damageIn: number): boolean {
  return damageOut !== 0 || healOut !== 0 || damageIn !== 0
}

export function liveFigureCell(
  key: LiveFigureKey,
  shown: LiveFiguresShown,
  texts: LiveFigureTexts | undefined
): LiveFigureCell {
  if (!shown[key] || texts === undefined) return { text: "" }
  return { text: texts[key] }
}
