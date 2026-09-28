import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const otherwhereVZombie = {
  id: "01a0e9fb-482d-7b2f-819f-05c5719ca3a4",
  type: "page-type/world-species",
  slug: "otherwhere-v-zombie",
  title: "Zombie",
  world: "world/ends-of-magic",
  description: "A walking corpse raised by death magic.",
} as const satisfies WorldSpecies
