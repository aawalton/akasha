import type { Stoplight } from "akasha/readouts/group-serving/readout-group-serving.module.code.ts"

const LEGEND_SEPARATOR = " · "

const GLYPH: Readonly<Record<Stoplight["tier"], string>> = {
  black: "⚫",
  red: "🔴",
  orange: "🟠",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
}

export function glyphsOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map((one) => GLYPH[one.tier]).join("")
}

export function legendOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map((one) => one.label).join(LEGEND_SEPARATOR)
}
