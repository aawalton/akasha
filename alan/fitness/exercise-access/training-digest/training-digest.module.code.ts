import { getEsoDayStr } from "@akasha/day/eso-day"
import {
  type ConstraintStanding,
  constraintStandings,
  type EquipmentStanding,
  equipmentStandings,
} from "../coaching-context/coaching-context.module.code.ts"
import { dayOfWeekFromDayStr } from "../day-of-week/day-of-week.module.code.ts"
import type { Row } from "../exercise-rows/exercise-rows.module.code.ts"
import {
  type MobilityStanding,
  mobilityStandings,
} from "../mobility-standing/mobility-standing.module.code.ts"
import {
  type MovementStanding,
  movementStandings,
  movementsInSessions,
  type SessionStanding,
  sessionStanding,
} from "../movement-standing/movement-standing.module.code.ts"
import {
  activeSchedule,
  type FocusRecency,
  focusOn,
  lastTrainedByFocus,
  recentSessionsForFocus,
} from "../schedule-focus/schedule-focus.module.code.ts"

export interface TrainingDigest {
  readonly date: string
  readonly focus: string | null
  readonly bodyweight: number
  readonly equipment: readonly EquipmentStanding[]
  readonly lastTrainedByFocus: readonly FocusRecency[]
  readonly movements: readonly MovementStanding[]
  readonly lastSession: SessionStanding | null
  readonly mobility: readonly MobilityStanding[]
  readonly constraints: readonly ConstraintStanding[]
}

export type Digested = { readonly digest: TrainingDigest } | { readonly refused: string }

export async function trainingDigest(
  asked: string | undefined,
  now: Date,
  bodyweight: number
): Promise<Digested> {
  const dayStr = getEsoDayStr(now)
  const scheduled = await activeSchedule()
  if ("refused" in scheduled) return scheduled
  const scheduleSlug = scheduled.row?.slug ?? null

  let focus: string | null = asked ?? null
  if (focus === null && scheduleSlug !== null) {
    const found = await focusOn(scheduleSlug, dayOfWeekFromDayStr(dayStr))
    if ("refused" in found) return found
    focus = found.focus
  }

  let recentRows: readonly Row[] = []
  if (focus !== null && scheduleSlug !== null) {
    const recent = await recentSessionsForFocus(scheduleSlug, focus)
    if ("refused" in recent) return recent
    recentRows = recent.rows
  }

  const sourced = await movementsInSessions(recentRows)
  if ("refused" in sourced) return sourced
  const movements = await movementStandings(sourced.slugs)
  if ("refused" in movements) return movements

  const equipment = await equipmentStandings()
  if ("refused" in equipment) return equipment
  const lastSession = await sessionStanding(recentRows[0], bodyweight)
  if ("refused" in lastSession) return lastSession
  const mobility = await mobilityStandings()
  if ("refused" in mobility) return mobility
  const constraints = await constraintStandings(focus)
  if ("refused" in constraints) return constraints
  const recencies = await lastTrainedByFocus(scheduleSlug)
  if ("refused" in recencies) return recencies

  return {
    digest: {
      date: dayStr,
      focus,
      bodyweight,
      equipment: equipment.equipment,
      lastTrainedByFocus: recencies.recencies,
      movements: movements.standings,
      lastSession: lastSession.standing,
      mobility: mobility.standings,
      constraints: constraints.constraints,
    },
  }
}
