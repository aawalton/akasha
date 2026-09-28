import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveCnhHeroAdmissions = {
  id: "01a0e9f2-9a51-7343-b0df-3be9d7cb7b7c",
  type: "page-type/world-mechanic",
  slug: "super-supportive-cnh-hero-admissions",
  title: "Celena North admissions assessment",
  world: "world/super-supportive",
  aliases: ["test day"],
  description: "A day of tests for entering Celena North's hero track.",
} as const satisfies WorldMechanic
