import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereIiMend = {
  id: "01a0e9a0-abb4-7b51-8169-f209daa33052",
  type: "page-type/world-skill",
  slug: "otherwhere-ii-mend",
  title: "Mend",
  world: "world/labyrinth-of-the-mad-god",
  description:
    "A spell: a green warmth of life mana laid on a wound that knits flesh and eases pain.",
  manaCost: 3,
  durationMinutes: 10,
} as const satisfies WorldSkill
