import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveAutomorph = {
  id: "01a0e9f5-fded-77f9-a606-502a01ca51ec",
  type: "page-type/world-mechanic",
  slug: "super-supportive-automorph",
  title: "Automorphs",
  world: "world/super-supportive",
  aliases: ["automorph"],
  description:
    "Morphish Enviro Brute abilities that kick in semiautomatically in response to the environment.",
} as const satisfies WorldMechanic
