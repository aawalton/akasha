import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitKickDirt = {
  id: "01a0657d-031f-7145-b296-8e103f392f56",
  type: "page-type/world-skill",
  slug: "unit-kick-dirt",
  title: "Unit: Kick Dirt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
