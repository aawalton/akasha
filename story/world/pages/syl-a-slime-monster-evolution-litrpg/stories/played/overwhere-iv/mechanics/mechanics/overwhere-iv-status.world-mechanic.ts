import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const overwhereIvStatus = {
  id: "01a0ed28-3fb3-7389-9b93-b314058190c7",
  type: "page-type/world-mechanic",
  slug: "overwhere-iv-status",
  title: "Status",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description:
    "The window the System shows a person of themselves: name, race, class, levels and state.",
} as const satisfies WorldMechanic
