import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stealthRoll = {
  id: "01a0657d-02f9-7fe9-83ae-d56dbca5a813",
  type: "page-type/world-skill",
  slug: "stealth-roll",
  title: "Stealth Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
