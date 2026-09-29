import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereICorath = {
  id: "01a0ed25-f4df-7e72-8114-bdadebd19cc8",
  type: "page-type/lore",
  slug: "overwhere-i-corath",
  title: "Corath",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "Corath was an Umarii warrior, Themiel's friend and like a brother to him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He died on the raid in which Themiel took the Hell Hound pup Luke from the red masks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The red masks of the Bloody Peaks killed him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Umarii Oracle foresaw that Themiel or Corath might not return from that raid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Themiel and the healer Serithe both grieve him.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Corath is dead.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
