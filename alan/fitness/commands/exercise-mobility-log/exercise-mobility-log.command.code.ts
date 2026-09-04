import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { chosenIn, decimalIn } from "@akasha/exercise-access/exercise-choosing"
import {
  MOBILITY_CONTEXT_OPTIONS,
  MOBILITY_METRIC_OPTIONS,
  MOBILITY_SIDE_OPTIONS,
} from "@akasha/exercise-access/exercise-vocabulary"
import {
  mobilityReadingName,
  mobilityReadingTitle,
  NO_SIDE,
} from "@akasha/exercise-access/mobility-derive"
import type { Value } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import { JSON_SAID, proseIn, saidIn } from "../exercise-said/exercise-said.module.code.ts"

const INPUT = 1

const DATA = 2

const MOBILITY_READING = "mobility-reading"

const METRIC = "--metric"

const VALUE = "--value"

const NUM = "--num"

const SIDE = "--side"

const CONTEXT = "--context"

const DATE = "--date"

const NOTE = "--note"

const STANDALONE = "standalone"

const NOTHING = "-"

const DAY_SAID = /^\d{4}-\d{2}-\d{2}$/

export async function exerciseMobilityLog(argv: readonly string[], given: Given): Promise<Answer> {
  const reading = saidIn(
    argv,
    [METRIC, VALUE, `${VALUE}-file`, NUM, SIDE, CONTEXT, DATE, NOTE, `${NOTE}-file`],
    [JSON_SAID],
    0
  )
  if ("refused" in reading) return refused(reading.refused, INPUT)
  const said = reading.said

  const metricSaid = said.held.get(METRIC)
  if (metricSaid === undefined) {
    return refused(
      `\`${METRIC}\` says which measurement was taken, and this call names none`,
      INPUT
    )
  }
  const metric = chosenIn(METRIC, metricSaid, MOBILITY_METRIC_OPTIONS)
  if ("refused" in metric) return refused(metric.refused, INPUT)

  const value = proseIn(said, VALUE)
  if ("refused" in value) return refused(value.refused, INPUT)
  if (value.text === undefined) {
    return refused(`\`${VALUE}\` carries the human read, and this call gives none`, INPUT)
  }

  const num = decimalIn(NUM, said.held.get(NUM))
  if ("refused" in num) return refused(num.refused, INPUT)

  const side = chosenIn(SIDE, said.held.get(SIDE) ?? NO_SIDE, MOBILITY_SIDE_OPTIONS)
  if ("refused" in side) return refused(side.refused, INPUT)

  const context = chosenIn(CONTEXT, said.held.get(CONTEXT) ?? STANDALONE, MOBILITY_CONTEXT_OPTIONS)
  if ("refused" in context) return refused(context.refused, INPUT)

  const daySaid = said.held.get(DATE)
  if (daySaid !== undefined && !DAY_SAID.test(daySaid)) {
    return refused(
      `\`${DATE}\` takes a day written YYYY-MM-DD, and this call says \`${daySaid}\``,
      INPUT
    )
  }
  const date = daySaid ?? getEsoDayStr(new Date())

  const note = proseIn(said, NOTE)
  if ("refused" in note) return refused(note.refused, INPUT)

  const values: Value = {
    title: mobilityReadingTitle(metric.chosen, date, side.chosen),
    context: context.chosen,
    mobilityReadingDate: date,
    mobilityReadingMetric: metric.chosen,
    side: side.chosen,
    mobilityReadingValueText: value.text,
    ...(num.number !== undefined ? { mobilityReadingValueNum: num.number } : {}),
    ...(note.text !== undefined ? { note: note.text } : {}),
  }
  const slug = mobilityReadingName(metric.chosen, date, side.chosen)

  const composed = composedFor(given.root, { pageTypeSlug: MOBILITY_READING, slug, values })
  if ("refused" in composed) return refused(composed.refused, DATA)

  const changes: FileEdit[] = [
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const answer = await landingAsked(given, {
    changes,
    message: `record the mobility reading ${slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (answer.code !== 0) return answer

  const json = said.bare.has(JSON_SAID)
  const told = json
    ? JSON.stringify({
        path: composed.put.path,
        metric: metric.chosen,
        date,
        side: side.chosen,
        valueText: value.text,
        valueNum: num.number ?? null,
      })
    : `path\t${composed.put.path}\nmetric\t${metric.chosen}\ndate\t${date}\nside\t${side.chosen}\nvalue\t${value.text}\nnum\t${num.number ?? NOTHING}`
  return { report: json ? [told] : [told, ...answer.report], refusals: [], code: 0 }
}
