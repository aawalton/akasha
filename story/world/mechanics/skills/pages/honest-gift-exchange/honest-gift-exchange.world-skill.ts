import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const honestGiftExchange = {
  id: "01a06575-981a-7a19-a0fe-42cafca55954",
  type: "page-type/world-skill",
  slug: "honest-gift-exchange",
  title: "Honest Gift Exchange",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
