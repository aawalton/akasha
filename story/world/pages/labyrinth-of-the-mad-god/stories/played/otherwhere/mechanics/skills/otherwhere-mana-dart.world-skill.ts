import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const otherwhereManaDart = {
  id: "01a0e9a0-abb3-7a48-86aa-7eab30153f61",
  type: "page-type/world-skill",
  slug: "otherwhere-mana-dart",
  title: "Mana Dart",
  world: "world/labyrinth-of-the-mad-god",
  description:
    "A spell: a small bright dart of pure mana that strikes at a target's health, stamina and mana.",
  manaCost: 2,
} as const satisfies WorldSkill
