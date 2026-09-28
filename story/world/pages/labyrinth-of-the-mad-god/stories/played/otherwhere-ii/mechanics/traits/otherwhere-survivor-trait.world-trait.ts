import type { WorldTrait } from "akasha/story/world/mechanics/traits/world-trait.page-type.types.ts"

export const otherwhereSurvivorTrait = {
  id: "01a0e99e-1edd-778b-be0a-4acab6fee0a2",
  type: "page-type/world-trait",
  slug: "otherwhere-survivor-trait",
  title: "Survivor",
  world: "world/labyrinth-of-the-mad-god",
  story: "story-played/otherwhere-ii",
  description: "A class trait: the body needs less food, water, air and sleep.",
} as const satisfies WorldTrait
