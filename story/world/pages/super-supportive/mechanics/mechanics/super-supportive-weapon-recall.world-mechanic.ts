import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveWeaponRecall = {
  id: "01a0e9fb-2b67-704d-9e47-2105d727f0aa",
  type: "page-type/world-mechanic",
  slug: "super-supportive-weapon-recall",
  title: "Weapon recall",
  world: "world/super-supportive",
  aliases: ["recall"],
  description:
    "A basic, well-known kind of Meister talent that calls a bound tool back to the hand.",
} as const satisfies WorldMechanic
