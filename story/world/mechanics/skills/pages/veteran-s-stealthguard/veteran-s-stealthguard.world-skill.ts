import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const veteranSStealthguard = {
  id: "01a0657d-0320-7ad6-8422-9cc289d2f1b1",
  type: "page-type/world-skill",
  slug: "veteran-s-stealthguard",
  title: "Veteran’s Stealthguard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
