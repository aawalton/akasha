import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicPiercingThrow = {
  id: "01a0657d-0242-7d8f-a6cc-e4f9fdaa391b",
  type: "page-type/world-skill",
  slug: "magic-piercing-throw",
  title: "Magic Piercing Throw",
  world: "world/the-wandering-inn",
  aliases: ["Magic-Piercing Throw"],
  references: "jsonl",
} as const satisfies WorldSkill
