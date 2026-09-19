import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingShot = {
  id: "01a0657d-0294-75c5-a694-a184d99334f5",
  type: "page-type/world-skill",
  slug: "piercing-shot",
  title: "Piercing Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
