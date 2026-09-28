import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereGrandArenaOfPapillion = {
  id: "01a0e9ba-0813-7f2a-bd7c-45986def4c92",
  type: "page-type/place",
  slug: "otherwhere-grand-arena-of-papillion",
  title: "The Grand Arena of Papillion",
  world: "world/labyrinth-of-the-mad-god",
  facts: [
    {
      fact: "The Grand Arena of Papillion runs many battles at once, shown on huge screens.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Volunteers from the tutorials fight here in a two-round bonus contest for better classes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The first round pits contestants against giant wasps whose stings carry subzero venom.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The second round brings a Fallen rhino that charges fast but turns badly.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Survivors rest afterwards in a luxury safe room with fine furnishings and coffee.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
