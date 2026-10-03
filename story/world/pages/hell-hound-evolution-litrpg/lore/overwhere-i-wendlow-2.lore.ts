import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIWendlow2 = {
  id: "01a0ff47-5a86-7236-bc48-ebf84343bbf8",
  type: "page-type/lore",
  slug: "overwhere-i-wendlow-2",
  title: "Wendlow, continued",
  world: "world/hell-hound-evolution-litrpg",
  about: "place/overwhere-i-wendlow",
  facts: [
    {
      fact: "For blades and bows Grete names Wil Harrow, smith on Anvil Lane, who buys fair.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "For pelts and monster parts Grete says the guild counting-house pays least, and Mother Sallow more.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
