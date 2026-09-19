import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const threefoldShot = {
  id: "01a0657d-0315-7176-8a2f-d8eea7697558",
  type: "page-type/world-skill",
  slug: "threefold-shot",
  title: "Threefold Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
