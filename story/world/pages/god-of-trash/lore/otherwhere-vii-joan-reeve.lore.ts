import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereViiJoanReeve = {
  id: "01a0eac1-6546-7dd2-af5a-c811c883a847",
  type: "page-type/lore",
  slug: "otherwhere-vii-joan-reeve",
  title: "Joan Reeve",
  world: "world/god-of-trash",
  about: "character-other/otherwhere-vii-joan-reeve",
  facts: [
    {
      fact: "Joan Reeve is Aldo's wife, a lean, quick woman who looks a stranger up and down.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-vii-nala",
        "character-other/otherwhere-vii-joan-reeve",
      ],
    },
    {
      fact: "Joan says Aldo has wanted a reckoner since before they wed.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-vii-nala",
        "character-other/otherwhere-vii-joan-reeve",
      ],
    },
  ],
} as const satisfies Lore
