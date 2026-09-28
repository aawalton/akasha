import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveOutfitter = {
  id: "01a0e9f6-d517-70bd-803d-f9456ccc3401",
  type: "page-type/world-skill",
  slug: "super-supportive-outfitter",
  title: "Outfitter",
  world: "world/super-supportive",
  description:
    "A skill that makes a jumpsuit of gray fabric strips slither into the clothes its user envisions.",
} as const satisfies WorldSkill
