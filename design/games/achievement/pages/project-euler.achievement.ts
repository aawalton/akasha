import type { Achievement } from "akasha/design/games/achievement/achievement.page-type.types.ts"

export const projectEuler = {
  id: "01a06808-8818-700c-bbd4-3ff7aadd7f6e",
  type: "achievement",
  slug: "project-euler",
  title: "Project Euler",
  partOfCollections: ["achievement/game-achievements"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "in-progress",
  rank: "A",
  externalIdentity: [{ source: "project-euler", externalLink: "https://projecteuler.net/" }],
} as const satisfies Achievement
