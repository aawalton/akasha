import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mightyKick = {
  id: "01a0657d-024d-7a10-b2cc-ae136645fe8d",
  type: "page-type/world-skill",
  slug: "mighty-kick",
  title: "Mighty Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
