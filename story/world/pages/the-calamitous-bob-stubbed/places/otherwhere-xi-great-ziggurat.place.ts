import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiGreatZiggurat = {
  id: "01a0ea80-ba6c-7610-9291-4c14f16e64d1",
  type: "page-type/place",
  slug: "otherwhere-xi-great-ziggurat",
  title: "The Great Ziggurat",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-old-harrak",
  facts: [
    {
      fact: "The Great Ziggurat, or Imperial Ziggurat, is an obsidian step pyramid at Old Harrak's heart.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Great Ziggurat's top is a crater.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Long, doorless stone corridors run through the Great Ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A lower ritual chamber in the Great Ziggurat is where the cataclysm spell was cast.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Great Ziggurat is said to have taken the lives of a nation.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ash from Old Red Light's eruption in the Shadowlands fell even on the Great Ziggurat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ten years ago sunlight fell on the Great Ziggurat for the first time in centuries.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Necrarchs once kept guard on the Great Ziggurat's stairs.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mornyr, too, has an Old Harrakan ziggurat, used as the seat of its civil government.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
