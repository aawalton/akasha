import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveTheRite = {
  id: "01a0e9f1-cfc2-7de1-9d69-80bb8ec6cfac",
  type: "page-type/world-mechanic",
  slug: "super-supportive-the-rite",
  title: "The Rite",
  world: "world/super-supportive",
  aliases: ["Rite"],
  description:
    "A ritual in which a person's own resource is destroyed in exchange for magical power.",
  createdAt: "2026-09-28T21:35:33.826Z",
  updatedAt: "2026-09-28T21:35:36.000Z",
} as const satisfies WorldMechanic
