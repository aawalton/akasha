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
} as const satisfies WorldMechanic
