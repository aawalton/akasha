import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const weaponSwitch = {
  id: "01a0657d-032d-73cb-b610-0e904fdde2e1",
  type: "world-skill",
  slug: "weapon-switch",
  title: "Weapon Switch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
