import { getEsoDayStr, getMountainMorningDayStr } from "@shared/recurrence/reset-times"
import { getOccurrenceAtOrAfter } from "@shared/recurrence/scheduling"
import { assertNever } from "@shared/utils-narrow"
import type { Trigger } from "./types"

type ScheduleTrigger = Extract<Trigger, { kind: "schedule" }>

export interface ScheduleDueResult {
  readonly occurrence: string
  readonly due: boolean
}

function logicalDay(resetDomain: ScheduleTrigger["resetDomain"], now: Date): string {
  switch (resetDomain) {
    case "eso-na":
      return getEsoDayStr(now)
    case "us-mountain":
      return getMountainMorningDayStr(now)
    default:
      return assertNever(resetDomain)
  }
}

export function isScheduleDue(
  trigger: ScheduleTrigger,
  now: Date,
  lastFiredOccurrence: string | null
): ScheduleDueResult {
  const occurrence = logicalDay(trigger.resetDomain, now)
  const firesToday = getOccurrenceAtOrAfter(trigger.rrule, occurrence) === occurrence
  return { occurrence, due: firesToday && lastFiredOccurrence !== occurrence }
}
