import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearArts = {
  id: "01a0657d-02ec-7bb8-9829-79ea754f5c7d",
  type: "page-type/world-skill",
  slug: "spear-arts",
  title: "Spear Arts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
