import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const favoriteWeapon = {
  id: "01a06575-980c-7143-8e68-634b86ccc86f",
  type: "page-type/world-skill",
  slug: "favorite-weapon",
  title: "Favorite Weapon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
