import { mergeUncommitted, uncommittedIn } from "@akasha/pages/page-uncommitted"

const POINTS_TODAY = "pointsToday"

const PAGES = "alan/attributes/pages"

export function attributePage(slug: string): string {
  return `${PAGES}/${slug}.attribute.ts`
}

export function keepPointsToday(root: string, slug: string, points: number): undefined {
  mergeUncommitted(root, attributePage(slug), { [POINTS_TODAY]: points })
}

export function pointsTodayKept(root: string, slug: string): number | null {
  const held = uncommittedIn(root, attributePage(slug))
  if (held === null) return null
  const points = held[POINTS_TODAY]
  return typeof points === "number" ? points : null
}
