import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deferDamageSkateboard = {
  id: "01a06575-9802-7956-b4f8-afa56871a92a",
  type: "page-type/world-skill",
  slug: "defer-damage-skateboard",
  title: "Defer Damage: Skateboard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
