import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiMinorWard = {
  id: "01a0f181-909e-7f9c-9e78-29ed3fc1273e",
  type: "page-type/world-skill",
  slug: "overwhere-iii-minor-ward",
  title: "Minor Ward",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "A thin shimmering shield of mana that turns aside a blow or two.",
  manaCost: 3,
  durationMinutes: 1,
} as const satisfies WorldSkill
