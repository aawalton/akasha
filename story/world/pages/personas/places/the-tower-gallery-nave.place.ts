import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const theTowerGalleryNave = {
  id: "01a0d440-2ed4-713e-9e51-945a5c75f01e",
  type: "page-type/place",
  slug: "the-tower-gallery-nave",
  title: "The Resonant Nave",
  world: "world/personas",
  loreDisclosure: "lore-disclosure/player",
  within: "place/the-tower-floor-03",
  depth: 3,
  description:
    "The long body of the gallery. Bronze resonance-plates stand at intervals down both walls, each taller than a man, ringing faintly at any sharp noise. Broken statues litter the floor — cover and rubble. The amber hum is loudest here; the air itself seems to carry sound too well.",
  exits: [
    { to: "place/the-tower-cistern-deep", way: "the spiral stair behind (down to the Cistern)" },
    { to: "place/the-tower-gallery-dais", way: "the open dais ahead" },
  ],
} as const satisfies Place
