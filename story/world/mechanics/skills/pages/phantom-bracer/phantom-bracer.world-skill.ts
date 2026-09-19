import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const phantomBracer = {
  id: "01a0657d-028f-759c-82ea-948da535b06d",
  type: "page-type/world-skill",
  slug: "phantom-bracer",
  title: "Phantom Bracer",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
