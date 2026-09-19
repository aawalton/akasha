import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thunderHammerSBlow = {
  id: "01a0657d-0315-789f-bfd1-b07883673c4b",
  type: "page-type/world-skill",
  slug: "thunder-hammer-s-blow",
  title: "Thunder Hammer’s Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
