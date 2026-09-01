import { selectHealthSamples } from "@akasha/health-samples-access/sample-selecting"
import { type HealthMetric } from "@akasha/health-samples-access/sample-shape"
import {
  cardioReading as akashaCardioReading,
  type DayMeasures,
  type HealthSample,
  readDayMeasures as akashaReadDayMeasures,
} from "readouts/activity-reading"
import {
  readSessionPages as akashaReadSessionPages,
  type SessionPage,
  type WakeWindow,
} from "readouts/session-readings"
import { askVia } from "./ask-through"

async function readSamples(given: {
  readonly metric: string
  readonly from: string
  readonly to: string
}): Promise<readonly HealthSample[]> {
  return selectHealthSamples({
    metric: given.metric as HealthMetric,
    from: given.from,
    to: given.to,
  })
}

export async function readSessionPages(): Promise<readonly SessionPage[]> {
  return akashaReadSessionPages(askVia())
}

export async function readDayMeasures(day: string): Promise<DayMeasures | null> {
  return akashaReadDayMeasures(day, askVia())
}

export async function cardioReading(day: string, span: WakeWindow): Promise<number | null> {
  return akashaCardioReading(day, span, readSamples)
}
