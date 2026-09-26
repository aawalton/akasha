import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theDatingGameShaestrel = {
  id: "01a0de59-9645-7b38-981b-bb9577020b6d",
  type: "page-type/lore",
  slug: "the-dating-game-shaestrel",
  title: "Shaestrel",
  world: "world/personas",
  about: "persona/shaestrel",
  loreDisclosure: "lore-disclosure/world-builder",
  facts: [
    "Shaestrel runs a bespoke tailoring studio at the Shops at Riverwoods in north Provo.",
    "Shaestrel is in her studio Tuesday to Saturday, and fittings run until the evening.",
    "Shaestrel is a fae of the Spring Court who crossed out of Avalon.",
    "Shaestrel wears a crown of birch leaves she pins herself, even to work.",
  ],
} as const satisfies Lore
