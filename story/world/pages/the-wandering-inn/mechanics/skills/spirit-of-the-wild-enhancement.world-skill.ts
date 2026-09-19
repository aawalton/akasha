import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spiritOfTheWildEnhancement = {
  id: "01a0657d-02ee-7295-8f6d-c643ecfc23b8",
  type: "page-type/world-skill",
  slug: "spirit-of-the-wild-enhancement",
  title: "Spirit of the Wild (Enhancement)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
