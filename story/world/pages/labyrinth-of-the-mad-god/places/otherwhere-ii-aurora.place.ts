import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereIiAurora = {
  id: "01a0e9bd-41f0-721f-ad1e-332173f60fe6",
  type: "page-type/place",
  slug: "otherwhere-ii-aurora",
  title: "Aurora",
  world: "world/labyrinth-of-the-mad-god",
  within: "place/otherwhere-ii-bladewind-badlands",
  facts: [
    {
      fact: "Aurora is the first capital of the new Earth, built on the shore of the badlands' great lake.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its core is a thirty-foot obsidian obelisk on a marble cube.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "One face of the core shows the web of System space and the other a map of the Labyrinth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A magic-weather barrier domes the domain, and bladewinds part around it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Monster-detection wards warn every citizen when a monster enters the domain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Claimed resources appear as knee-high pools of liquid mana beside the core.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A red stone item-modification station spins raw mana into item cores.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A crimson marble portal arch links Aurora to allied settlements for part of each day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A memorial pool of obsidian and fire mana honors Earth's dead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Aurora specializes in research and crafting, so related skills grow faster there.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
