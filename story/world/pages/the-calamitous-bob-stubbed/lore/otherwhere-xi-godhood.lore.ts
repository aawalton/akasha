import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGodhood = {
  id: "01a0ea84-11c7-72fb-9a5b-b5985cab88eb",
  type: "page-type/lore",
  slug: "otherwhere-xi-godhood",
  title: "Godhood",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-mechanic/otherwhere-xi-godhood",
  facts: [
    {
      fact: "Gods need belief and deeds consistent with their nature.",
      knowers: ["lore-disclosure/game-master"],
    },
    { fact: "Gods act according to their attributes.", knowers: ["lore-disclosure/game-master"] },
    {
      fact: "A god's domain is its cause, not the tools it uses.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gods can die, by the Slayer or while they are incarnate.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A dead god's essence can linger and return, as Khaton's did.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sovereigns are not gods, but world mana reshapes them by their people's expectations.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The sixth step of a path is near-divine and can lead toward godhood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An Ascender is a mortal of demigod rank, halfway to godhood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Empress Viviane receives worship, with budding attributes of order, change and progress.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
