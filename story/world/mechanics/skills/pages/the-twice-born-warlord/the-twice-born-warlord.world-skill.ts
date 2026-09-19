import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theTwiceBornWarlord = {
  id: "01a0657d-0312-7db7-9428-42e965edaa5f",
  type: "page-type/world-skill",
  slug: "the-twice-born-warlord",
  title: "The Twice-Born Warlord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
