import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveTheVathaLantern = {
  id: "01a0e9fa-4782-7c3a-bf43-722f870613bc",
  type: "page-type/world-skill",
  slug: "super-supportive-the-vatha-lantern",
  title: "The Vatha Lantern",
  world: "world/super-supportive",
  description: 'A knight skill: "That which mesmerizes only to burn."',
} as const satisfies WorldSkill
