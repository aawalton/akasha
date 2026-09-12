import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const POINTS_BEFORE_TODAY = "pointsBeforeToday"

const POINTS_TODAY = "pointsToday"

const POINTS_TOTAL = "pointsTotal"

const MESSAGES_TO_THE_POINT = 100

export type Paged = { readonly path: string }

export function pointsIn(messages: number): number {
  return messages / MESSAGES_TO_THE_POINT
}

function numberKept(root: string, persona: Paged, key: string): number | null {
  const held = uncommittedIn(root, persona.path)
  if (held === null) return null
  const points = held[key]
  return typeof points === "number" ? points : null
}

export function pointsBeforeTodayKept(root: string, persona: Paged): number | null {
  return numberKept(root, persona, POINTS_BEFORE_TODAY)
}

export function pointsTodayKept(root: string, persona: Paged): number | null {
  return numberKept(root, persona, POINTS_TODAY)
}

export function pointsTotalKept(root: string, persona: Paged): number | null {
  return numberKept(root, persona, POINTS_TOTAL)
}

export function keepPointsBeforeToday(root: string, persona: Paged, points: number): undefined {
  const today = pointsTodayKept(root, persona) ?? 0
  mergeUncommitted(root, persona.path, {
    [POINTS_BEFORE_TODAY]: points,
    [POINTS_TOTAL]: points + today,
  })
}

export function keepPointsToday(root: string, persona: Paged, points: number): undefined {
  const before = pointsBeforeTodayKept(root, persona) ?? 0
  mergeUncommitted(root, persona.path, {
    [POINTS_TODAY]: points,
    [POINTS_TOTAL]: before + points,
  })
}

export function keepPoints(root: string, persona: Paged, before: number, today: number): undefined {
  mergeUncommitted(root, persona.path, {
    [POINTS_BEFORE_TODAY]: before,
    [POINTS_TODAY]: today,
    [POINTS_TOTAL]: before + today,
  })
}
