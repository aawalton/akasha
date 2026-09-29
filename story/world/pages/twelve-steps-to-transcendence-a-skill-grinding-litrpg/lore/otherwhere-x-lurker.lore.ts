import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXLurker = {
  id: "01a0ea7a-dd29-7bdd-9da6-9fd31c2c0e64",
  type: "page-type/lore",
  slug: "otherwhere-x-lurker",
  title: "Lurker",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  about: "world-mechanic/otherwhere-x-lurker",
  facts: [
    {
      fact: "[Lurker] passively obscures its holder's presence in shadows.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It is a non-Unique title with a progress counter out of 100.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its counter rises by sneaking, staying unseen in view of beasts, and stealth kills.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It went from 1/100 to 5/100 over a few stealth encounters.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "It works even when not equipped.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Tier 2 Shadow Monkeys, invisible and blindingly fast, carry it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ben usurped it from a Shadow Monkey in a rift; his stands at 13/100.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
