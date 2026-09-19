import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const travellerSWelcome = {
  id: "01a0657d-0316-7726-a383-31750bcd0543",
  type: "page-type/world-skill",
  slug: "traveller-s-welcome",
  title: "Traveller’s Welcome",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
