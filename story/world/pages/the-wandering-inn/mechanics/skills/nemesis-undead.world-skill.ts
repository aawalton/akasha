import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const nemesisUndead = {
  id: "01a0657d-027a-71bc-9849-a904104a91b7",
  type: "page-type/world-skill",
  slug: "nemesis-undead",
  title: "Nemesis: Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
