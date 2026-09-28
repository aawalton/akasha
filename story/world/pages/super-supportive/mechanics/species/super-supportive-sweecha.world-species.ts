import type { WorldSpecies } from "akasha/story/world/mechanics/species/world-species.page-type.types.ts"

export const superSupportiveSweecha = {
  id: "01a0e9fc-be83-742a-a694-d15e12d238e0",
  type: "page-type/world-species",
  slug: "super-supportive-sweecha",
  title: "Sweecha",
  world: "world/super-supportive",
  description:
    "A speckle-furred, mouse-sized creature with tufted ears that clings to vines and calls its own name.",
} as const satisfies WorldSpecies
