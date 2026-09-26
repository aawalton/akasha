import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheSystem = {
  id: "01a0de07-e06a-718b-a69e-e9449e27d077",
  type: "page-type/lore",
  slug: "the-tower-the-system",
  title: "The Tower's System",
  world: "world/personas",
  about: "story-played/the-tower",
  facts: [
    {
      fact: "The System reports a climber's state and offers options, and says nothing else.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The System gives every climber the same words in the same situation.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The System never advises, foreshadows, judges or flatters.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The System raises no warning or alarm; its readouts are flat.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Soul Appraisal shows a climber's eight attributes as numbers.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Soul Appraisal shows a climber's Health, Mana and Stamina.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "The Soul Appraisal shows no combat numbers, no item or dice numbers, and no traits.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
    {
      fact: "A climber sees more of his own sheet only as he earns a way to know it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-tower-alan"],
    },
  ],
} as const satisfies Lore
