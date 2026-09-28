import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveInstantCorners = {
  id: "01a0e9f6-d517-7a98-b750-4c164b27ccc9",
  type: "page-type/world-skill",
  slug: "super-supportive-instant-corners",
  title: "Instant Corners",
  world: "world/super-supportive",
  description:
    "An Agility Brute skill that changes direction or body position instantly at full speed.",
} as const satisfies WorldSkill
