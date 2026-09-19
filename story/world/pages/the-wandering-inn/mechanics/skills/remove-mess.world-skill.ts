import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeMess = {
  id: "01a0657d-02b0-7068-a70e-8891efa777ad",
  type: "page-type/world-skill",
  slug: "remove-mess",
  title: "Remove Mess",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
