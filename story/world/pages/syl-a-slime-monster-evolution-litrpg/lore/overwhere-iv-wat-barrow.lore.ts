import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const overwhereIvWatBarrow = {
  id: "01a0f17e-d5d2-7df0-a15b-aba223fc5774",
  type: "page-type/lore",
  slug: "overwhere-iv-wat-barrow",
  title: "Wat Barrow",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  facts: [
    {
      fact: "Wat Barrow is a gate guard of Millbrook, twenty-two, lanky and earnest.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Identify shows him as Human LV 14, Guard LV 9.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He keeps the gate book, writing each stranger's name, business and the day.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He takes a jest well, and a pretty stranger's jest better, though he tries not to show it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Captain Hale has ordered every traveller robbed by the Red Hand sent to him to be asked.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Wat would tell a robbed stranger to see the captain in the gatehouse, and Sister Anwen for bread.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No toll is asked of a stranger on foot with nothing to sell.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
