import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weaponSwitch = {
  id: "01a0657d-032d-73cb-b610-0e904fdde2e1",
  type: "page-type/world-skill",
  slug: "weapon-switch",
  title: "Weapon Switch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
