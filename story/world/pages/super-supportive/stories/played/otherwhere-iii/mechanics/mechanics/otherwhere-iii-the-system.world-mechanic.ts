import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const otherwhereIiiTheSystem = {
  id: "01a0e9e2-ee4f-7eba-988f-63eac4c35ebe",
  type: "page-type/world-mechanic",
  slug: "otherwhere-iii-the-system",
  title: "The System",
  world: "world/super-supportive",
  aliases: ["Interdimensional Warrior's Contract", "the Artonan System", "the Contract"],
  description:
    "The Artonan magic that chooses a few humans as Avowed and gives them a class, a rank, skills and an interface.",
} as const satisfies WorldMechanic
