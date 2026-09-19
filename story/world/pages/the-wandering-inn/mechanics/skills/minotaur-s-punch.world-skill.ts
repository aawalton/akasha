import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minotaurSPunch = {
  id: "01a0657d-0261-707b-9592-ff9be0645fb1",
  type: "page-type/world-skill",
  slug: "minotaur-s-punch",
  title: "Minotaur’s Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
