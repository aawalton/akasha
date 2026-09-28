import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVAdventurers = {
  id: "01a0e9f5-e1ad-78bd-9693-302a63cac7a3",
  type: "page-type/lore",
  slug: "otherwhere-v-adventurers",
  title: "Adventurers",
  world: "world/ends-of-magic",
  about: "world-organization/otherwhere-v-adventurers",
  facts: [
    {
      fact: "Adventurers are mortal fighters, a different kind of person from the immortal Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Gemore adventurers rank near the top of society, above crafters and merchants.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore's Adventurer's Guild has mustered its adventurers in its courtyard since the city's founding.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "An old guildmistress who limps with a spear heads Gemore's Adventurer's Guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore adventurers hire out as teams for pay.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Esebus soldiers do the fighting, and adventuring is a low-prestige way out of poverty.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Few adventurers live long enough to lay down their arms in old age.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
