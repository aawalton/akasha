import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameAranya = {
  id: "01a0de59-9644-70c9-9538-c9b3144f12f5",
  type: "page-type/lore",
  slug: "the-dating-game-aranya",
  title: "Aranya",
  world: "world/personas",
  about: "persona/aranya",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Aranya is an arborist on Provo City's urban forestry crew, tending the oldest street trees.",
    "Aranya is a spirit gathered from roots and buried lines, and she hums faintly gold when near wire.",
    "Aranya spends her nights among the old cottonwoods at Fort Utah Park beside the Provo River.",
    "Aranya can be found at Fort Utah Park at dusk, listening to the roots and the power lines.",
  ],
} as const satisfies Lore
