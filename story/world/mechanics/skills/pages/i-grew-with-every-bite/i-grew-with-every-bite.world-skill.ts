import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iGrewWithEveryBite = {
  id: "01a06575-981b-7587-961e-887dc5532af0",
  type: "page-type/world-skill",
  slug: "i-grew-with-every-bite",
  title: "I Grew With Every Bite",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
