import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerTheWelcomer01 = {
  id: "01a0d450-fc4b-751c-8665-c42a85f35322",
  type: "page-type/lore",
  slug: "the-tower-the-welcomer-01",
  title: "The Welcomer",
  world: "world/personas",
  about: "character-other/the-tower-the-welcomer-01",
  facts: [
    {
      fact: "The Welcomer that hunted the Hall of Welcome is dead, snuffed out by fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Welcomer's kind are slight, cold predators that kill from arm's reach.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The true cold form of the Welcomer's kind is frail and unarmoured.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "With the haven dead, the Welcomer's kind have no woven face to wear.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
