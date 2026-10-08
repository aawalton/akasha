import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveKittyMoonBarrier = {
  id: "01a0e9f1-d242-7e03-a5ba-f36501cc34bf",
  type: "page-type/world-skill",
  slug: "super-supportive-kitty-moon-barrier",
  title: "Kitty Moon Barrier",
  world: "world/super-supportive",
  aliases: ["Moody Moon Barrier", "Skill Number 1"],
  description: "A custom skill that blocks out other people's emotions.",
  createdAt: "2026-09-28T21:35:34.466Z",
  updatedAt: "2026-09-28T21:35:37.000Z",
} as const satisfies WorldSkill
