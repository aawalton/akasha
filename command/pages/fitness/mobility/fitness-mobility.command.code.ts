import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { fitnessMobility as page } from "akasha/command/pages/fitness/mobility/fitness-mobility.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  numberAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const READING_TYPE = "flexibility-log"

const NO_SIDE = "n-a"

export type Reading = {
  readonly metric: string
  readonly side: string
  readonly on: string
  readonly num: number | null
}

export type Way = {
  readonly metric: string
  readonly side: string
  readonly readings: number
  readonly from: string
  readonly to: string
  readonly first: number | null
  readonly last: number | null
  readonly moved: number | null
}

export function readingsIn(pages: readonly Value[]): readonly Reading[] {
  const held: Reading[] = []
  for (const one of pages) {
    const metric = textAt(one, "mobilityReadingMetric")
    const on = textAt(one, "mobilityReadingDate")
    if (metric === null || on === null) continue
    held.push({
      metric,
      side: textAt(one, "side") ?? NO_SIDE,
      on,
      num: numberAt(one, "mobilityReadingValueNum"),
    })
  }
  return held
}

function wayOf(metric: string, side: string, held: readonly Reading[]): Way {
  const sorted = [...held].sort((a, b) => a.on.localeCompare(b.on))
  const numbered = sorted.flatMap((one) => (one.num === null ? [] : [one.num]))
  const first = numbered[0] ?? null
  const last = numbered[numbered.length - 1] ?? null
  const moved = numbered.length < 2 || first === null || last === null ? null : last - first
  return {
    metric,
    side,
    readings: sorted.length,
    from: sorted[0]?.on ?? "",
    to: sorted[sorted.length - 1]?.on ?? "",
    first,
    last,
    moved,
  }
}

export function waysIn(readings: readonly Reading[]): readonly Way[] {
  const held = new Map<string, Reading[]>()
  for (const one of readings) {
    const key = `${one.metric}/${one.side}`
    const was = held.get(key) ?? []
    was.push(one)
    held.set(key, was)
  }
  const ways: Way[] = []
  for (const group of held.values()) {
    const one = group[0]
    if (one !== undefined) ways.push(wayOf(one.metric, one.side, group))
  }
  return ways.sort((a, b) => a.metric.localeCompare(b.metric) || a.side.localeCompare(b.side))
}

export function sayingOf(way: Way): string {
  if (way.moved === null) return "  no direction yet — a direction takes two readings with a number"
  const said = `${String(way.first)} to ${String(way.last)}`
  if (way.moved > 0) return `  ${said} — gaining ${String(way.moved)}`
  if (way.moved < 0) return `  ${said} — losing ${String(-way.moved)}`
  return `  ${said} — holding`
}

export function saidOf(ways: readonly Way[]): readonly string[] {
  if (ways.length === 0) return ["no joint has a reading yet"]
  const said: string[] = []
  for (const one of ways) {
    if (said.length > 0) said.push("")
    said.push(one.side === NO_SIDE ? one.metric : `${one.metric} (${one.side})`)
    const many = one.readings === 1 ? "reading" : "readings"
    said.push(`  ${String(one.readings)} ${many}, ${one.from} to ${one.to}`)
    said.push(sayingOf(one))
  }
  return said
}

export function mobilityIn(root: string): readonly Way[] {
  return waysIn(readingsIn(valuesOfType(root, READING_TYPE).map((one) => one.value)))
}

export function fitnessMobility(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json])
  if ("refused" in read) return mistaking(read.refused)
  try {
    const ways = mobilityIn(given.root)
    if (read.taken.json) return told([JSON.stringify(ways)])
    return told([...saidOf(ways)])
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
