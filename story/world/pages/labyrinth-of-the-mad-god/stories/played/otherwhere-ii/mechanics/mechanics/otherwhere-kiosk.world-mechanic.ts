import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereKiosk = {
  id: "01a0e9a6-b35e-7b51-87fe-2c4fd348e0dc",
  type: "page-type/world-mechanic",
  slug: "otherwhere-kiosk",
  title: "Kiosk",
  world: "world/labyrinth-of-the-mad-god",
  description:
    "A black obelisk with a glass screen that shows a contestant's quests, profile and encyclopedia.",
} as const satisfies WorldMechanic
