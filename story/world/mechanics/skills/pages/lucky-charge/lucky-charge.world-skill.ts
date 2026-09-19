import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const luckyCharge = {
  id: "01a0657d-0241-7c87-902f-990e3f250906",
  type: "page-type/world-skill",
  slug: "lucky-charge",
  title: "Lucky Charge",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
