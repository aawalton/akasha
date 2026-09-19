import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftOfAmor = {
  id: "01a06575-9815-782e-8d54-3d121950bbb9",
  type: "page-type/world-skill",
  slug: "gift-of-amor",
  title: "Gift of Amor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
