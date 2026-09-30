import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIStarfallWeave = {
  id: "01a0f1e4-d54d-7676-b054-be754d6dc74a",
  type: "page-type/world-skill",
  slug: "overwhere-i-starfall-weave",
  title: "Starfall Weave",
  world: "world/hell-hound-evolution-litrpg",
  description: "Two elements bound into one working, such as steam, magma or a storm.",
  manaCost: 20,
  durationMinutes: 1,
} as const satisfies WorldSkill
