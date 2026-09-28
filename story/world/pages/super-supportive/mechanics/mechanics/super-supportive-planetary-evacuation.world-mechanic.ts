import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePlanetaryEvacuation = {
  id: "01a0e9f9-1fa4-73b3-a3c9-da508e644026",
  type: "page-type/world-mechanic",
  slug: "super-supportive-planetary-evacuation",
  title: "planetary evacuation",
  world: "world/super-supportive",
  aliases: ["evacuation list", "planetary evacuation priority"],
  description: "Artonan mass teleportation of chosen people off Earth from secret gathering sites.",
} as const satisfies WorldMechanic
