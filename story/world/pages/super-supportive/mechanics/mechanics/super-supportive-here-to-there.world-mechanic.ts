import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveHereToThere = {
  id: "01a0e9fa-4781-740e-a511-5228fe4373ab",
  type: "page-type/world-mechanic",
  slug: "super-supportive-here-to-there",
  title: "Here-to-There",
  world: "world/super-supportive",
  aliases: ["moving day"],
  description:
    "A ceremonial migration of households from lands sheltered by one wizard to another's.",
  createdAt: "2026-09-28T21:44:48.769Z",
  updatedAt: "2026-09-28T21:44:54.000Z",
} as const satisfies WorldMechanic
