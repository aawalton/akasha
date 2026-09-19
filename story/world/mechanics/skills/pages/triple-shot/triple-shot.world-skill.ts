import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tripleShot = {
  id: "01a0657d-0317-7d03-a011-dce614f5e641",
  type: "page-type/world-skill",
  slug: "triple-shot",
  title: "Triple Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
