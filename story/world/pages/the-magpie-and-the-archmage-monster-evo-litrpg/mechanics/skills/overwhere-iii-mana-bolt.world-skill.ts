import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiManaBolt = {
  id: "01a0f181-909d-7cb2-b4d9-fa82f3b2653e",
  type: "page-type/world-skill",
  slug: "overwhere-iii-mana-bolt",
  title: "Mana Bolt",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "A dart of raw mana thrown from the hand at one target.",
  manaCost: 2,
} as const satisfies WorldSkill
