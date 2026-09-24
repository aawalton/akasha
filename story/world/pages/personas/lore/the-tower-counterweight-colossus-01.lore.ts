import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theTowerCounterweightColossus01 = {
  id: "01a0d44f-cab5-7f96-8ed8-9fea7f0f549f",
  type: "page-type/lore",
  slug: "the-tower-counterweight-colossus-01",
  title: "The Counterweight Colossus",
  world: "world/personas",
  about: "character-other/the-tower-counterweight-colossus-01",
  loreDisclosure: "lore-disclosure/game-master",
  facts: [
    "The Counterweight Colossus is slow.",
    "The Colossus's stone-and-iron body barely marks under blows anywhere but its pawl.",
    "One iron pawl at the Colossus's waist holds its wound counterweight drum.",
    "A solid hit on the Colossus's pawl unwinds the whole counterweight through it and tears it apart.",
    "Reading the Colossus's pawl takes intellect and placing a blow on it finesse, never might.",
    "The Colossus's pawl cannot be read in the dark.",
    "A slab driven up hard against the Colossus over-tensions its chain and bares the pawl.",
    "The Colossus wakes when someone nears the exit-stair or the gantry, or strikes it.",
  ],
} as const satisfies Lore
