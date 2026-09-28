import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIxWeaponGrowth = {
  id: "01a0ea3e-aa8f-7b47-90a3-a7676d662ebf",
  type: "page-type/world-mechanic",
  slug: "otherwhere-ix-weapon-growth",
  title: "Weapon Growth",
  world: "world/mana-devourer-litrpgmana-cultivation",
  aliases: ["weapon stats", "weapon evolution", "weapon core"],
  description: "The way a living weapon gains stats, skills, grades and a core of its own.",
} as const satisfies WorldMechanic
