import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const magebaneArmaments = {
  id: "01a0657d-0241-7565-abeb-6081d7dc72fe",
  type: "page-type/world-skill",
  slug: "magebane-armaments",
  title: "Magebane Armaments",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
