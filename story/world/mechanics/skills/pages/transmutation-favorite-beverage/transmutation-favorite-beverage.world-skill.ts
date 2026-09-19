import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const transmutationFavoriteBeverage = {
  id: "01a0657d-0316-7870-b889-d929ef1c5d89",
  type: "page-type/world-skill",
  slug: "transmutation-favorite-beverage",
  title: "Transmutation: Favorite Beverage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
