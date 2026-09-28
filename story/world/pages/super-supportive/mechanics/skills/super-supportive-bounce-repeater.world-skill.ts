import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveBounceRepeater = {
  id: "01a0e9fb-2b67-7489-8f5c-a0c3b8477aaf",
  type: "page-type/world-skill",
  slug: "super-supportive-bounce-repeater",
  title: "Bounce Repeater",
  world: "world/super-supportive",
  description:
    "A Brute skill for hopping higher and higher while active without touching the ground.",
} as const satisfies WorldSkill
