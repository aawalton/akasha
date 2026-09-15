import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop10000InBeatSaber = {
  id: "01a06808-8818-700e-a318-6dfe998e7cd0",
  type: "page-type/achievement",
  slug: "reach-top-10-000-in-beat-saber",
  title: "Reach Top 10,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -10000,
  ownLength: 1325175,
  ownProgress: 1325175,
  unit: "unit/words",
  status: "completed",
  rank: "A",
} as const satisfies Achievement
