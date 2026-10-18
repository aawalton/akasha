import type { Stoplight } from "akasha/alan/harness/readout/modules/group-serving/readout-group-serving.module.code.ts"
import { TIER_GLYPH } from "akasha/alan/harness/readout/modules/tier/readout-tier.computed-property-module.code.ts"

const LEGEND_SEPARATOR = " · "

export function glyphsOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map((one) => TIER_GLYPH[one.tier]).join("")
}

function legendEntryOf(one: Stoplight): string {
  if (one.reading === "") return one.label
  return [one.label, one.reading, one.unit].filter((word) => word !== undefined).join(" ")
}

export function legendOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map(legendEntryOf).join(LEGEND_SEPARATOR)
}
