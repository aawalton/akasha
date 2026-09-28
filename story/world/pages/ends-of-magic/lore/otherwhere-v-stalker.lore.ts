import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVStalker = {
  id: "01a0e9f8-f7c7-74c0-afa8-47e078f6bc7a",
  type: "page-type/lore",
  slug: "otherwhere-v-stalker",
  title: "Stalker",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-stalker",
  facts: [
    {
      fact: "Stalkers are six-legged predators about the size of a pony.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Stalkers live near Gemore and on the continent of Esebus.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Stalkers pounce very fast; "faster than a stalker\'s pounce" is a saying.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Stalkers live in nests or dens, and "a nest of stalkers" means a real menace.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A stalker patriarch, the head of a nest, is a notable kill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'Folk bet "stalker teeth to dragon bones" when sure of a thing.',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: '"Stalker shit" is a curse for foolish superstition.',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
