import { selectHealthSamples } from "../../../alanwalton/health-samples-access/src/select"
import { type HealthMetric } from "../../../alanwalton/health-samples-access/src/types"
import type { Fetcher } from "@shared/pages-query"
import {
  cardioReading as akashaCardioReading,
  type DayMeasures,
  type HealthSample,
  readDayMeasures as akashaReadDayMeasures,
} from "../../../readouts/activity-reading.ts"
import {
  readSessionPages as akashaReadSessionPages,
  type SessionPage,
  type WakeWindow,
} from "../../../readouts/session-readings.ts"
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

export async function readSessionPages(fetcher?: Fetcher): Promise<readonly SessionPage[]> {
  return akashaReadSessionPages(askVia(fetcher))
}

export async function readDayMeasures(
  day: string,
  fetcher?: Fetcher
): Promise<DayMeasures | null> {
  return akashaReadDayMeasures(day, askVia(fetcher))
}

export async function cardioReading(day: string, span: WakeWindow): Promise<number | null> {
  return akashaCardioReading(day, span, readSamples)
}
