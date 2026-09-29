import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereXiNecromancy = {
  id: "01a0ea8b-ae82-716e-a4b6-95a502a5a4da",
  type: "page-type/world-mechanic",
  slug: "otherwhere-xi-necromancy",
  title: "Necromancy",
  world: "world/the-calamitous-bob-stubbed",
  description: "Magic that raises, binds or commands the dead.",
} as const satisfies WorldMechanic
