import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { chosenIn, countIn } from "@akasha/exercise-access/exercise-choosing"
import { numberIn, rowsFor, textIn } from "@akasha/exercise-access/exercise-rows"
import { MOBILITY_METRIC_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { mobilityTrend, type Trend } from "@akasha/exercise-access/mobility-derive"
import { JSON_SAID, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const MOBILITY_READING = "mobility-reading"

const METRIC = "--metric"

const LIMIT = "--limit"

const HOW_MANY = 30

const NOTHING = "-"

const APART = "::"

export async function exerciseMobilityShow(
  argv: readonly string[],
  _given: Given
): Promise<Answer> {
  const reading = saidIn(argv, [METRIC, LIMIT], [JSON_SAID], 0)
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const metricSaid = said.held.get(METRIC)
  let metric: string | null = null
  if (metricSaid !== undefined) {
    const chosen = chosenIn(METRIC, metricSaid, MOBILITY_METRIC_OPTIONS)
    if ("refused" in chosen) return refused(chosen.refused, INPUT)
    metric = chosen.chosen
  }
  const counted = countIn(LIMIT, said.held.get(LIMIT))
  if ("refused" in counted) return refused(counted.refused, INPUT)
  const limit = counted.number ?? HOW_MANY
  const json = said.bare.has(JSON_SAID)

  const found = await rowsFor({
    pageTypeSlug: MOBILITY_READING,
    where: metric === null ? [] : [{ key: "mobilityReadingMetric", eq: metric }],
    order: [{ by: "mobilityReadingDate", dir: "desc" }],
    limit,
  })
  if ("unread" in found) return refused(found.unread, DATA)

  const readings = found.rows.map((row) => ({
    metric: textIn(row, "mobilityReadingMetric") ?? NOTHING,
    date: textIn(row, "mobilityReadingDate") ?? null,
    side: textIn(row, "side") ?? null,
    context: textIn(row, "context") ?? null,
    valueText: textIn(row, "mobilityReadingValueText") ?? null,
    valueNum: numberIn(row, "mobilityReadingValueNum") ?? null,
  }))

  const numbersByKey = new Map<string, number[]>()
  for (const one of [...readings].reverse()) {
    if (one.valueNum === null) continue
    const key = `${one.metric}${APART}${one.side ?? ""}`
    const held = numbersByKey.get(key) ?? []
    held.push(one.valueNum)
    numbersByKey.set(key, held)
  }
  const trends = new Map<string, Trend>()
  for (const [key, numbers] of numbersByKey) trends.set(key, mobilityTrend(numbers))

  if (json) {
    return {
      report: [JSON.stringify({ readings, trends: Object.fromEntries(trends) })],
      refusals: [],
      code: 0,
    }
  }
  if (readings.length === 0)
    return { report: ["no mobility reading stands"], refusals: [], code: 0 }
  const report = readings.map(
    (one) =>
      `${one.date ?? NOTHING}\t${one.metric}\t${one.side ?? NOTHING}\t${one.context ?? NOTHING}\t${one.valueText ?? NOTHING}\t${one.valueNum ?? NOTHING}`
  )
  for (const [key, trend] of trends) report.push(`trend\t${key}\t${trend}`)
  return { report, refusals: [], code: 0 }
}
