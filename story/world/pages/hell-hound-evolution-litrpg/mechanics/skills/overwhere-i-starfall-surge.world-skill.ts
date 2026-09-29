import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIStarfallSurge = {
  id: "01a0ed18-9719-7a07-9d6a-d01527b93306",
  type: "page-type/world-skill",
  slug: "overwhere-i-starfall-surge",
  title: "Starfall Surge",
  world: "world/hell-hound-evolution-litrpg",
  description: "Raw element loosed from the reserves as a blast, a ward or a burst of speed.",
  manaCost: 10,
  durationMinutes: 1,
} as const satisfies WorldSkill
