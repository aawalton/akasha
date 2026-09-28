import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveSinkAndSurface = {
  id: "01a0e9f6-d518-787c-9180-99ff04cfc1c6",
  type: "page-type/world-skill",
  slug: "super-supportive-sink-and-surface",
  title: "Sink and Surface",
  world: "world/super-supportive",
  description:
    "An Aqua Brute skill for sinking deeper, resurfacing faster and moving through water.",
} as const satisfies WorldSkill
