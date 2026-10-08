import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerAlcoveScratchedWords = {
  id: "01a0d443-e0af-7232-9235-fea223370801",
  type: "page-type/lore",
  slug: "the-tower-alcove-scratched-words",
  title: "The Words on the Alcove Wall",
  world: "world/personas",
  about: "story-item/the-tower-alcove-scratched-words",
  facts: [
    {
      fact: 'The words above the alcove\'s corpse read "IT SINGS THROUGH THE BRONZE".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The words above the alcove\'s corpse go on "KILL THE BRONZE".',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'The words above the alcove\'s corpse end "THE STONE ONE ONLY WAKES AT THE ARCH."',
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  createdAt: "2026-09-24T16:33:33.359Z",
  updatedAt: "2026-09-26T18:13:39.000Z",
} as const satisfies Lore
