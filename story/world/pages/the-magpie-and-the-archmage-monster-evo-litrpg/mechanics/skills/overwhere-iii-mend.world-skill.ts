import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIiiMend = {
  id: "01a0f181-909e-7246-b6f2-8b672e6cc7ff",
  type: "page-type/world-skill",
  slug: "overwhere-iii-mend",
  title: "Mend",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  description: "A soft healing light that closes small wounds and eases bruises.",
  manaCost: 4,
} as const satisfies WorldSkill
