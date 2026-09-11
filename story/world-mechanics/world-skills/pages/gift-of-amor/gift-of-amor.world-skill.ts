import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const giftOfAmor = {
  id: "01a06575-9815-782e-8d54-3d121950bbb9",
  type: "world-skill",
  slug: "gift-of-amor",
  title: "Gift of Amor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
