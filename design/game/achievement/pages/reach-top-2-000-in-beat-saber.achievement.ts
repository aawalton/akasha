import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop2000InBeatSaber = {
  id: "01a06808-8818-7011-b936-f564575a808c",
  type: "page-type/achievement",
  slug: "reach-top-2-000-in-beat-saber",
  title: "Reach Top 2,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -2000,
  ownLength: 3149600,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:44.728Z",
  updatedAt: "2026-09-15T15:43:56.000Z",
} as const satisfies Achievement
