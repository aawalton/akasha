import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hammerBlow = {
  id: "01a06575-9818-7050-8029-5daf9e7dd574",
  type: "world-skill",
  slug: "hammer-blow",
  title: "Hammer Blow",
  world: "the-wandering-inn",
  aliases: ["Hammer Blow!"],
  references: "jsonl",
} as const satisfies WorldSkill
