import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveINeedABreakFromPeople = {
  id: "01a0e9f1-d241-7efe-b444-532cfd1a7dea",
  type: "page-type/world-skill",
  slug: "super-supportive-i-need-a-break-from-people",
  title: "I Need a Break from People",
  world: "world/super-supportive",
  aliases: ["Skill Number 3", "catspace"],
  description:
    "A custom escape skill: the user leaves their body for a place of their own, then reappears beside a being they attached to.",
} as const satisfies WorldSkill
