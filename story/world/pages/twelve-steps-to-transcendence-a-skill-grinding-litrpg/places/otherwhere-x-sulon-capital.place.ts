import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereXSulonCapital = {
  id: "01a0ea7d-0ec3-7793-b6dd-82578ce839e0",
  type: "page-type/place",
  slug: "otherwhere-x-sulon-capital",
  title: "Everhold",
  world: "world/twelve-steps-to-transcendence-a-skill-grinding-litrpg",
  within: "place/otherwhere-x-sulon",
  facts: [
    {
      fact: "Everhold is the capital of Sulon and its king's seat.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Everhold is many days' ride south of Harrow; few in the heartland's north ever see it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The king's steward for the northern heartland sits at Aldermere.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The capital has proper academies teaching about the System, skills and mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Merchant guilds and rival factions contend in the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A rival faction there can wipe out even a massive merchant guild.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A healer can save up to buy a small clinic in the capital.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The capital is far from Sulon's frontier by the regional wall.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Place
