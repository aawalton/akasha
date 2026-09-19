import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sniffARogue = {
  id: "01a0657d-02c7-777e-a930-bc301cb9cd59",
  type: "page-type/world-skill",
  slug: "sniff-a-rogue",
  title: "Sniff a Rogue",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
