import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereVDawnsConcord = {
  id: "01a0e9fa-3dbc-70e9-ac63-e74e9d36ae11",
  type: "page-type/place",
  slug: "otherwhere-v-dawns-concord",
  title: "Dawn's Concord",
  world: "world/ends-of-magic",
  within: "place/otherwhere-v-ostren",
  facts: [
    {
      fact: "Dawn's Concord is a port city on Ostren's north coast, probably its largest city.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The city is built of rosy-white marble blessed by Aresi, dawn-colored with gold streaks.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dawn's Concord lies on a hilly coast by a calm sea with normal-sized waves.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Every hill in the city has a columned plaza, a bell tower and a fountain.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fountain water runs down channels in the middle of the streets to the parks and the sea.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The piers hold grand open-air markets, with about a hundred ships at dock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Ships from many shipbuilding traditions dock at Dawn's Concord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Dawn's Concord is so peaceful it has no walls, guards or defensive enchantments.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The mirrored sphere of the Arena of the Concord crowns the city's largest hill.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "When it is mid-morning in Gemore, it is still before dawn in Dawn's Concord.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The forested valleys of Ostren's wilds lie about a day's flight south of the city.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Place
