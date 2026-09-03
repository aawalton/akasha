import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop6000InBeatSaber = {
  id: "01a06808-8818-7015-92ac-09b1cca89753",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-6-000-in-beat-saber",
  title: "Reach Top 6,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -6000,
  ownLength: 1574925,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
