import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepPointsBeforeToday, pointsIn } from "@akasha/personas/persona-points-keeping"
import { personaAt } from "@akasha/personas/persona-reading"
import { sentBefore } from "../../track/daily/day-messages-totalling/day-messages-totalling.module.code.ts"

const NO_PERSONA = "no persona is filed under this name, so her count is counted against nobody"

export type Rebuilt = { readonly rebuilt: number; readonly unread: readonly string[] }

export type Keeping = (slug: string, points: number) => boolean

export function rebuiltOver(sent: ReadonlyMap<string, number>, keep: Keeping): Rebuilt {
  const unread: string[] = []
  let rebuilt = 0
  for (const [slug, messages] of sent) {
    if (keep(slug, pointsIn(messages))) rebuilt += 1
    else unread.push(`${slug} — ${NO_PERSONA}`)
  }
  return { rebuilt, unread }
}

export function rebuildPoints(root: string, before: string): Rebuilt {
  return rebuiltOver(sentBefore(root, before), (slug, points) => {
    const persona = personaAt(root, slug)
    if (persona === null) return false
    keepPointsBeforeToday(root, persona, points)
    return true
  })
}

export function saidOf(rebuilt: number): string {
  const said = rebuilt === 1 ? "persona was" : "personas were"
  return `${String(rebuilt)} ${said} rebuilt from the days before today`
}

if (import.meta.main) {
  const root = process.env.AKASHA_ROOT ?? process.cwd()
  const done = rebuildPoints(root, getEsoDayStr(new Date()))
  process.stdout.write(`${[saidOf(done.rebuilt), ...done.unread].join("\n")}\n`)
}
