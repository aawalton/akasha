import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop7000InBeatSaber = {
  id: "01a06808-8818-7016-bfeb-627c13ffda50",
  type: "page-type/achievement",
  slug: "reach-top-7-000-in-beat-saber",
  title: "Reach Top 7,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -7000,
  ownLength: 1482425,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:44.728Z",
  updatedAt: "2026-09-15T15:43:56.000Z",
} as const satisfies Achievement
