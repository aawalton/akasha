import { type Stoplight, stoplightsInGroup } from "@akasha/readout-system/readout-group-serving"
import { readingHeldOn } from "@akasha/readout-system/readout-serving"

const ON_THE_WORKSTATION = "http://127.0.0.1:8787"

const LEGEND_SEPARATOR = " · "

const GLYPH: Readonly<Record<Stoplight["tier"], string>> = {
  black: "⚫",
  red: "🔴",
  orange: "🟠",
  yellow: "🟡",
  green: "🟢",
  blue: "🔵",
}

export function nameTheStore(): undefined {
  process.env.PAGES_SERVICE_ORIGIN ??= ON_THE_WORKSTATION
  return undefined
}

export function readGroup(groupSlug: string): Promise<readonly Stoplight[]> {
  nameTheStore()
  return stoplightsInGroup(groupSlug, "habit", readingHeldOn)
}

export function glyphsOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map((one) => GLYPH[one.tier]).join("")
}

export function legendOf(stoplights: readonly Stoplight[]): string {
  return stoplights.map((one) => one.label).join(LEGEND_SEPARATOR)
}

export type GroupDrawing = {
  readonly glyphs: string
  readonly legend: string
}

export async function drawGroup(groupSlug: string): Promise<GroupDrawing> {
  const stoplights = await readGroup(groupSlug)
  return { glyphs: glyphsOf(stoplights), legend: legendOf(stoplights) }
}
