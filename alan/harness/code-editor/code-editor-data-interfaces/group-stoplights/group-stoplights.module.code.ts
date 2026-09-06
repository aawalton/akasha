// The stoplights themselves are composed by the service that writes what the status bar draws,
// which reads the readout pages off the checkout it sits in. What is left here is the drawing.

import type { Stoplight } from "@akasha/readout-system/readout-group-serving"

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
