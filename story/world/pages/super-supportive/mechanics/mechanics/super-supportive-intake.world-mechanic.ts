import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveIntake = {
  id: "01a0e9f2-f0a2-74f8-9a0a-3d0cb5fcfa32",
  type: "page-type/world-mechanic",
  slug: "super-supportive-intake",
  title: "Intake",
  world: "world/super-supportive",
  aliases: ["intake dorms"],
  description: "The program that houses and settles new Avowed on Anesidora.",
} as const satisfies WorldMechanic
