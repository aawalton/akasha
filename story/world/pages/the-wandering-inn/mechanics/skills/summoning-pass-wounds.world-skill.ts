import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summoningPassWounds = {
  id: "01a0657d-0302-7331-99d9-7993dd8a73f4",
  type: "page-type/world-skill",
  slug: "summoning-pass-wounds",
  title: "Summoning: Pass Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
