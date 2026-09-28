import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIxGildedHarbourCity = {
  id: "01a0ea42-fcbf-7f7c-8eb6-1539e97d9d53",
  type: "page-type/place",
  slug: "otherwhere-ix-gilded-harbour-city",
  title: "The Gilded Harbour City",
  world: "world/mana-devourer-litrpgmana-cultivation",
  facts: [
    {
      fact: "The gilded harbour city is a vast, gleaming city on the sea, below Randall's palace.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its harbour bustles with fishmongers, shipwrights, traders and tavern-goers, under gulls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Extravagant houses and rich districts flank the palace above the city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The harbour city's name is not commonly spoken; it is not desert-bound Sun City.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
