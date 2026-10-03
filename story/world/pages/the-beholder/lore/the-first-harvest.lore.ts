import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const theFirstHarvest = {
  id: "01a0ddf8-63fd-77fc-8380-32a69f2ca5e5",
  type: "page-type/lore",
  slug: "the-first-harvest",
  title: "The First Harvest",
  world: "world/the-beholder",
  about: "world-mechanic/the-beholder-the-first-harvest",
  facts: [
    {
      fact: "Pearl had not planned to kill that night, only eventually, as a vague horizon.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl carried only a sewing kit and a crush on the idea of being more than she was.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The power surfaced as Pearl helped Colette out of the act-three bodice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette, speaking to Pearl's reflection, told Pearl she should be dancing.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "Pearl's appetite, the hum, rose, and she tasted Colette's finest qualities.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A calm certainty told Pearl she could just take it.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "Pearl felt no fear or dread at the kill, only a giddy, fizzing, about-to exhilaration.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette finally read Pearl a quarter-second too late.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl cut Colette's throat with her shears as the mirrors showed a hundred of each of them.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The kill triggered Pearl's first Acquisition appraisal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Colette was unpowered, so the three traits offered were her top three attributes.",
      knowers: ["lore-disclosure/game-master", "character-player/the-beholder-pearl"],
    },
    {
      fact: "Pearl took Her Beauty, a +10% slice of Colette's Allure 16, raising Pearl's Allure 14 to 15.6.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Pearl passed over Colette's Celerity and Acuity.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
