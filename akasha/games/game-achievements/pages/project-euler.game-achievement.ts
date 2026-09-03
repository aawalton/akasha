import type { GameAchievement } from "../game-achievement.page-type.ts"

export const projectEuler = {
  id: "01a06808-8818-700c-bbd4-3ff7aadd7f6e",
  pageTypeSlug: "game-achievement",
  slug: "project-euler",
  title: "Project Euler",
  partOfSlugs: ["game-achievements"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "in-progress",
  rank: "A",
  externalLink: "https://projecteuler.net/",
} as const satisfies GameAchievement
