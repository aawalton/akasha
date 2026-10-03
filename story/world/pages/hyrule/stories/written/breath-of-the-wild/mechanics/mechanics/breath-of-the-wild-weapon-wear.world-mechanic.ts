import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const breathOfTheWildWeaponWear = {
  id: "01a10331-b562-70bb-b01c-3c2422217f2f",
  type: "page-type/world-mechanic",
  slug: "breath-of-the-wild-weapon-wear",
  title: "Weapon Wear",
  world: "world/hyrule",
  description:
    "Every weapon in Hyrule has an attack and wears with use until it breaks; a branch lasts a few blows, a Boko Club about twelve.",
} as const satisfies WorldMechanic
