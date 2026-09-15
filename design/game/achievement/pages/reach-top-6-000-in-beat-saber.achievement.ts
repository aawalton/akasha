import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop6000InBeatSaber = {
  id: "01a06808-8818-7015-92ac-09b1cca89753",
  type: "page-type/achievement",
  slug: "reach-top-6-000-in-beat-saber",
  title: "Reach Top 6,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -6000,
  ownLength: 1574925,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Achievement
