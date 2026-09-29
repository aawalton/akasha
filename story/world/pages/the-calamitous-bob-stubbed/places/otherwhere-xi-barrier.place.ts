import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXiBarrier = {
  id: "01a0ea8c-0790-704d-9d44-e8479475a0c7",
  type: "page-type/place",
  slug: "otherwhere-xi-barrier",
  title: "Barrier",
  world: "world/the-calamitous-bob-stubbed",
  within: "place/otherwhere-xi-sandsong",
  facts: [
    {
      fact: "Barrier is Sandsong's border city at the pass through the Salt Mountains.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A statue of a singing woman marks the pass above Barrier.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Barrier was burned by a young black dragon of the fire bloodline this autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "About seven hundred of Barrier's dead lie in a mass grave; black mana seeps from it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Viv slew the black dragon that burned Barrier and raised a tomb for her nearby.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The dragon's tomb near Barrier is an artifact that warns all comers not to open it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sandsong's royal army camped near Barrier's ruins this autumn.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "At the Battle of Barrier this winter Harrak and Sandsong met some six thousand Sheem troops.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oleander won the campaign at Barrier; there the War of the Ascended began.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In late winter Barrier is a burned ruin in Sheem-held Sandsong.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
