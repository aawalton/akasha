import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveSystemVolunteering = {
  id: "01a0e9fb-2b67-7792-ad2d-77be4133b50d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-system-volunteering",
  title: "Volunteering through the System",
  world: "world/super-supportive",
  aliases: ["loop me in"],
  description: "Asking the System to place you as a volunteer at a facility for a set time.",
} as const satisfies WorldMechanic
