import { keepPoints, pointsIn } from "@akasha/personas/persona-points-keeping"
import { personaAt } from "@akasha/personas/persona-reading"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import {
  daysCounted,
  daysMessaged,
  daysOn,
  sentOver,
} from "../../track/daily/day-messages-totalling/day-messages-totalling.module.code.ts"

const NO_PERSONA = "no persona is filed under this name, so her count is counted against nobody"

export type Rebuilt = { readonly rebuilt: number; readonly unread: readonly string[] }

export type Keeping = (slug: string, before: number, today: number) => boolean

export function rebuiltOver(
  before: ReadonlyMap<string, number>,
  today: ReadonlyMap<string, number>,
  keep: Keeping
): Rebuilt {
  const unread: string[] = []
  let rebuilt = 0
  for (const slug of new Set([...before.keys(), ...today.keys()])) {
    if (keep(slug, pointsIn(before.get(slug) ?? 0), pointsIn(today.get(slug) ?? 0))) rebuilt += 1
    else unread.push(`${slug} — ${NO_PERSONA}`)
  }
  return { rebuilt, unread }
}

export function rebuildPoints(root: string, today: string): Rebuilt {
  const days = daysMessaged(root)
  return rebuiltOver(
    sentOver(daysCounted(days, today)),
    sentOver(daysOn(days, today)),
    (slug, before, now) => {
      const persona = personaAt(root, slug)
      if (persona === null) return false
      keepPoints(root, persona, before, now)
      return true
    }
  )
}

export function saidOf(rebuilt: number): string {
  const said = rebuilt === 1 ? "persona was" : "personas were"
  return `${String(rebuilt)} ${said} rebuilt from the days counted`
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  const done = rebuildPoints(root, getEsoDayStr(new Date()))
  process.stdout.write(`${[saidOf(done.rebuilt), ...done.unread].join("\n")}\n`)
}
