import { asking } from "@akasha/pages-service/asking"
import { levelOf } from "../../../alan/harness/attributes/levelling/attributes-levelling.module.code.ts"
import type { Taken } from "../../../alan/harness/attributes/reading/attributes-reading.module.code.ts"
import { totalAttributes } from "../../../alan/harness/attributes/totalling/attributes-totalling.module.code.ts"
import type { Answer, Given } from "../../../command-system/calling/calling.module.code.ts"

const READOUT = "readout"

const GROUP = "attributes"

const PLACES = 2

const NOTHING_READ =
  "no attribute could be worked out, so there is nothing to say. A figure Alan did not earn " +
  "would be a lie, and no figure at all is not a figure of zero."

export type Measured = {
  readonly label: string
  readonly level: number
  readonly figure: number
}

export function flooredTo(value: number, places: number): number {
  const scale = 10 ** places
  return Math.floor(value * scale) / scale
}

function slugIn(path: string): string {
  const parts = path.split("/")
  return parts[parts.length - 2] ?? ""
}

type Drawn = { readonly label: string; readonly place: number }

export function drawnIn(root: string): ReadonlyMap<string, Drawn> {
  const found = new Map<string, Drawn>()
  const asked = asking(root, {
    pageTypeSlug: READOUT,
    keys: ["slug", "label", "place", "groupSlugs"],
  } as never)
  if ("refused" in asked) throw new Error(asked.refused)
  for (const row of asked.rows) {
    const one = row as Readonly<Record<string, unknown>>
    const groups = one["groupSlugs"]
    if (!Array.isArray(groups) || !groups.includes(GROUP)) continue
    const slug = String(one["slug"] ?? "")
    const label = String(one["label"] ?? slug)
    const place = typeof one["place"] === "number" ? one["place"] : 0
    found.set(slug, { label, place })
  }
  return found
}

export function measuredIn(taken: Taken, drawn: ReadonlyMap<string, Drawn>): readonly Measured[] {
  const held: (Measured & { place: number })[] = []
  for (const [path, value] of Object.entries(taken.kept)) {
    const shown = drawn.get(slugIn(path))
    if (shown === undefined) continue
    held.push({
      label: shown.label,
      level: levelOf(value),
      figure: flooredTo(value, PLACES),
      place: shown.place,
    })
  }
  held.sort((one, two) => one.place - two.place)
  return held.map((one) => ({ label: one.label, level: one.level, figure: one.figure }))
}

function widestOf(values: readonly string[]): number {
  return values.reduce((most, one) => Math.max(most, one.length), 0)
}

export function linesOf(measured: readonly Measured[]): readonly string[] {
  const cells = measured.map((one) => ({
    label: one.label,
    level: String(one.level),
    figure: one.figure.toFixed(PLACES),
  }))
  const labels = widestOf(cells.map((one) => one.label))
  const levels = widestOf(cells.map((one) => one.level))
  const figures = widestOf(cells.map((one) => one.figure))
  return cells.map(
    (one) =>
      `${one.label.padEnd(labels)}  ${one.level.padStart(levels)}  ${one.figure.padStart(figures)}`
  )
}

export async function measureAttributes(_argv: readonly string[], given: Given): Promise<Answer> {
  const taken = await totalAttributes(given.root)
  const measured = measuredIn(taken, drawnIn(given.root))
  if (measured.length === 0) {
    return { report: [], refusals: [NOTHING_READ, ...taken.unread], code: 2 }
  }
  const said = [...linesOf(measured)]
  return {
    report: taken.unread.length === 0 ? said : [...said, "", ...taken.unread],
    refusals: [],
    code: 0,
  }
}
