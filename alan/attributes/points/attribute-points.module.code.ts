import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  mergeUncommitted,
  uncommittedIn,
} from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"

const POINTS_BEFORE_TODAY = "pointsBeforeToday"

const POINTS_TODAY = "pointsToday"

const POINTS_TOTAL = "pointsTotal"

const ATTRIBUTE = "attribute"

function pageIn(root: string, slug: string): string | null {
  return listedAt(root, ATTRIBUTE, slug)[0]?.path ?? null
}

function pageOr(root: string, slug: string): string {
  const at = pageIn(root, slug)
  if (at === null) {
    throw new Error(
      `\`${slug}\` names no attribute the index carries, so its points have no page to sit ` +
        "beside — points filed at a path made up here are points nobody can read"
    )
  }
  return at
}

function numberKept(root: string, slug: string, key: string): number | null {
  const at = pageIn(root, slug)
  if (at === null) return null
  const held = uncommittedIn(root, at)
  if (held === null) return null
  const points = held[key]
  return typeof points === "number" ? points : null
}

export function pointsBeforeTodayKept(root: string, slug: string): number | null {
  return numberKept(root, slug, POINTS_BEFORE_TODAY)
}

export function keepPointsBeforeToday(root: string, slug: string, points: number): undefined {
  const at = pageOr(root, slug)
  const today = pointsTodayKept(root, slug) ?? 0
  mergeUncommitted(root, at, {
    [POINTS_BEFORE_TODAY]: points,
    [POINTS_TOTAL]: points + today,
  })
}

export function keepPointsToday(root: string, slug: string, points: number): undefined {
  const at = pageOr(root, slug)
  const before = pointsBeforeTodayKept(root, slug) ?? 0
  mergeUncommitted(root, at, {
    [POINTS_TODAY]: points,
    [POINTS_TOTAL]: before + points,
  })
}

export function pointsTodayKept(root: string, slug: string): number | null {
  return numberKept(root, slug, POINTS_TODAY)
}

export function pointsTotalKept(root: string, slug: string): number | null {
  return numberKept(root, slug, POINTS_TOTAL)
}
