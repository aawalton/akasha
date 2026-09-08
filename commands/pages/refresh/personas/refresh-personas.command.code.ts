import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepPointsBeforeToday, pointsIn } from "@akasha/personas/persona-points-keeping"
import { personaAt } from "@akasha/personas/persona-reading"
import { sentBefore } from "../../../../alan/track/daily/day-messages-totalling/day-messages-totalling.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"

const NOTHING_REBUILT =
  "no persona was written to on any day before today, so nothing was rebuilt. A figure Alan did " +
  "not earn her would be a lie, and the figures already kept are left as they were."

const NO_PERSONA = "no persona is filed under this name, so her count is counted against nobody"

export function saidOf(rebuilt: number): string {
  const said = rebuilt === 1 ? "persona was" : "personas were"
  return `${rebuilt} ${said} rebuilt from the days before today`
}

export function refreshPersonas(_argv: readonly string[], given: Given): Answer {
  const sent = sentBefore(given.root, getEsoDayStr(new Date()))
  const unread: string[] = []
  let rebuilt = 0
  for (const [slug, messages] of sent) {
    const persona = personaAt(given.root, slug)
    if (persona === null) {
      unread.push(`${slug} — ${NO_PERSONA}`)
      continue
    }
    keepPointsBeforeToday(given.root, persona, pointsIn(messages))
    rebuilt += 1
  }
  if (rebuilt === 0) {
    return { report: [], refusals: [NOTHING_REBUILT, ...unread], code: 2 }
  }
  return { report: [saidOf(rebuilt), ...unread], refusals: [], code: 0 }
}
