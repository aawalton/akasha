import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magicStone = {
  id: "01a0657d-0242-7a08-9ec7-2d2c431fc3ab",
  type: "page-type/world-skill",
  slug: "magic-stone",
  title: "Magic Stone",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
