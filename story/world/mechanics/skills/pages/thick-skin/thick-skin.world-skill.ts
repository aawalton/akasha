import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thickSkin = {
  id: "01a0657d-0313-7d65-8686-fb6ea3933734",
  type: "page-type/world-skill",
  slug: "thick-skin",
  title: "Thick Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
