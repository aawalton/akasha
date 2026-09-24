import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerAlcoveScratchedWords = {
  id: "01a0d443-e0af-7232-9235-fea223370801",
  type: "page-type/lore",
  slug: "the-tower-alcove-scratched-words",
  title: "The Words on the Alcove Wall",
  world: "world/personas",
  about: "item/the-tower-alcove-scratched-words",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    'The words above the alcove\'s corpse read "IT SINGS THROUGH THE BRONZE".',
    'The words above the alcove\'s corpse go on "KILL THE BRONZE".',
    'The words above the alcove\'s corpse end "THE STONE ONE ONLY WAKES AT THE ARCH."',
  ],
} as const satisfies Lore
