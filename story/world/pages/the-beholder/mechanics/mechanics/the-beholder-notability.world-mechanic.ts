import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theBeholderNotability = {
  id: "01a0deed-6022-7af6-8f53-c3dda82bae57",
  type: "page-type/world-mechanic",
  slug: "the-beholder-notability",
  title: "Notability",
  world: "world/the-beholder",
  description:
    "The System ranks a victim's traits by Magnitude × Rarity × Salience and surfaces the top three. An unpowered victim yields three attributes; an Awakened victim yields attributes with a possible power among them. The readout is mechanical and indifferent: it states each trait, the victim's value, the change to Pearl's sheet and what the attribute governs, and nothing more.",
} as const satisfies WorldMechanic
