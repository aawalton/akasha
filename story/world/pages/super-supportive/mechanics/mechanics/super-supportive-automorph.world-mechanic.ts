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
  createdAt: "2026-09-28T21:40:07.789Z",
  updatedAt: "2026-09-28T21:40:13.000Z",
} as const satisfies WorldMechanic
