import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sixbladeSlash = {
  id: "01a0657d-02c5-776f-a3b9-a679d1a57fdc",
  type: "page-type/world-skill",
  slug: "sixblade-slash",
  title: "Sixblade Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
