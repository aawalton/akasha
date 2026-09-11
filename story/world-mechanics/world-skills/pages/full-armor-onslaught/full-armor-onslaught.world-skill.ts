import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fullArmorOnslaught = {
  id: "01a06575-9811-70c6-b635-63125884714f",
  type: "world-skill",
  slug: "full-armor-onslaught",
  title: "Full Armor Onslaught",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["armored-blow"],
  references: "jsonl",
} as const satisfies WorldSkill
