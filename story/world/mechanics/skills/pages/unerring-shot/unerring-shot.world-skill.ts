import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unerringShot = {
  id: "01a0657d-031e-7809-9ace-1f50e3776709",
  type: "page-type/world-skill",
  slug: "unerring-shot",
  title: "Unerring Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
