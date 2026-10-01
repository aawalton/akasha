import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereITheGreyfenAlpha22 = {
  id: "01a0f7d8-c03f-7d9e-9d09-99901ab611ee",
  type: "page-type/lore",
  slug: "overwhere-i-the-greyfen-alpha-2-2",
  title: "Ghost-Eye, the Greyfen Alpha, continued, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "lore/overwhere-i-the-greyfen-alpha",
  facts: [
    {
      fact: "Near 10:00 on day 4 two Mire Snappers are tearing at Ghost-Eye's haunches.",
      knowers: ["lore-disclosure/game-master", "character-player/overwhere-i-nala"],
    },
    {
      fact: "With Rowan's hatchet, taking Ghost-Eye's head off takes about ten minutes.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
