import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTargeting = {
  id: "01a0e9f1-065f-7745-b563-142102c16d84",
  type: "page-type/world-mechanic",
  slug: "super-supportive-targeting",
  title: "Targeting",
  world: "world/super-supportive",
  aliases: ["target", "targeting halo", "autotarget"],
  description: "The picking of a person for a skill, marked by a white halo over them.",
} as const satisfies WorldMechanic
