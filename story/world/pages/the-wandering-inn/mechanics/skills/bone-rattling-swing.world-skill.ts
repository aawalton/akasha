import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boneRattlingSwing = {
  id: "01a06575-97f7-787b-9695-163c56f0f787",
  type: "page-type/world-skill",
  slug: "bone-rattling-swing",
  title: "Bone-rattling Swing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
