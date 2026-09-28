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
} as const satisfies WorldMechanic
