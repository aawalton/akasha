import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const amateurLinguist = {
  id: "01a06575-97eb-7aca-93a2-b2ae5df9588e",
  type: "page-type/world-skill",
  slug: "amateur-linguist",
  title: "Amateur Linguist",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
