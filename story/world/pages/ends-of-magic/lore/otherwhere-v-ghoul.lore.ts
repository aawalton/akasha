import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVGhoul = {
  id: "01a0e9f9-9dd7-77fc-a5b3-7aaf76077f21",
  type: "page-type/lore",
  slug: "otherwhere-v-ghoul",
  title: "Ghoul",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-ghoul",
  facts: [
    {
      fact: 'Ghouls are dreaded monsters, and "ghoul" is used of any trouble or foe.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Stare the ghoul in the eye" means to face doom; "don\'t run from the ghoul" too.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Don\'t stare the ghoul in the eye on your own" urges facing danger together.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"The next ghoul" or "a fresh ghoul" means the next trouble to come.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'In Gemore, "ghoul uncle" is an insult.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
