import { selectHealthSamples } from "@akasha/health-samples-access/sample-selecting"
import type { HealthMetric } from "@akasha/health-samples-access/sample-shape"
import { cardioReading as engineCardioReading, type HealthSample } from "readouts/activity-reading"
import {
  readSessionPages as engineReadSessionPages,
  type SessionPage,
  type WakeWindow,
} from "readouts/session-readings"
import { askVia } from "../ask-through/ask-through.module.code.ts"

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
  return engineReadSessionPages(askVia())
}

export async function cardioReading(day: string, span: WakeWindow): Promise<number | null> {
  return engineCardioReading(day, span, readSamples)
}
