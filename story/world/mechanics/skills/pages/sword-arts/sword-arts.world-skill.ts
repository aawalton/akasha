import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const swordArts = {
  id: "01a0657d-0307-7ca3-8539-98d62911af15",
  type: "page-type/world-skill",
  slug: "sword-arts",
  title: "Sword Arts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
