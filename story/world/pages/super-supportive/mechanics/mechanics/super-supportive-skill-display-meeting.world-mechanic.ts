import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSkillDisplayMeeting = {
  id: "01a0e9f9-7733-724c-a07a-4f4409971e3f",
  type: "page-type/world-mechanic",
  slug: "super-supportive-skill-display-meeting",
  title: "Skill display meeting",
  world: "world/super-supportive",
  aliases: ["skill display"],
  description: "A gathering where knights show and discuss their skills' progress.",
} as const satisfies WorldMechanic
