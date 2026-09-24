import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0d44d-c48c-7fd1-9fbb-a43db4dad7ce",
  type: "page-type/lore",
  slug: "the-tower-ashling-01",
  title: "The Ashling",
  world: "world/personas",
  about: "character-other/the-tower-ashling-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Ashling is loose ash held together around one bright core at its chest.",
    "The Ashling's core is the only solid thing in it.",
    "Blows that scatter the Ashling's ash do it little harm.",
    "A strike on the Ashling's core kills it.",
    "Water smothers the Ashling's core and finishes it.",
    "The Ashling wakes at the first movement past the iron door.",
  ],
} as const satisfies Lore
