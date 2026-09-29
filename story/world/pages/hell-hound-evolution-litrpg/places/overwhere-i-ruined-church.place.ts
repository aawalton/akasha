import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const overwhereIRuinedChurch = {
  id: "01a0ed26-5402-7364-acff-0d8e54e8dfa7",
  type: "page-type/place",
  slug: "overwhere-i-ruined-church",
  title: "The Ruined Church by the Bridge",
  world: "world/hell-hound-evolution-litrpg",
  facts: [
    {
      fact: "A ruined dark-stone church with spires and stained glass sits beside a river bridge.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The bridge beside the ruined church is broken but still passable on foot.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The ruined church marks the edge of the Umarii lands.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Its black stone matches the Umarii ruins of the wastes, and the Umarii likely built it long ago.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Mud by the church bears a pup's scrawl: Hi! Human? Why speak? Where?",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Valrok Wyrmscar found that scrawl and learned that a Hell Hound could think and write.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Vulpyr Fox first met the Nameless Hell Hound's pack at the ruined church.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A maintained bridge crosses the river further downstream, a safer crossing.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No one holds the ruined church; travellers and beasts pass through it.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
