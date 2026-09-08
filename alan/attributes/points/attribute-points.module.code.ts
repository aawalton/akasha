import { mergeUncommitted, uncommittedIn } from "@akasha/pages/page-uncommitted"

const POINTS_BEFORE_TODAY = "pointsBeforeToday"

const POINTS_TODAY = "pointsToday"

const POINTS_TOTAL = "pointsTotal"

const PAGES = "alan/attributes/pages"

export function attributePage(slug: string): string {
  return `${PAGES}/${slug}.attribute.ts`
}

function numberKept(root: string, slug: string, key: string): number | null {
  const held = uncommittedIn(root, attributePage(slug))
  if (held === null) return null
  const points = held[key]
  return typeof points === "number" ? points : null
}

export function pointsBeforeTodayKept(root: string, slug: string): number | null {
  return numberKept(root, slug, POINTS_BEFORE_TODAY)
}

export function keepPointsBeforeToday(root: string, slug: string, points: number): undefined {
  mergeUncommitted(root, attributePage(slug), { [POINTS_BEFORE_TODAY]: points })
}

export function keepPointsToday(root: string, slug: string, points: number): undefined {
  const before = pointsBeforeTodayKept(root, slug) ?? 0
  mergeUncommitted(root, attributePage(slug), {
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
