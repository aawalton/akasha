import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVOrc = {
  id: "01a0e9f2-e897-7a09-9d1e-b5092fc98016",
  type: "page-type/lore",
  slug: "otherwhere-v-orc",
  title: "Orc",
  world: "world/ends-of-magic",
  about: "world-species/otherwhere-v-orc",
  facts: [
    {
      fact: "Orcs, also spelled orks, are a thinking people with green lips and impressive teeth.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orcs can grow enormous; the largest reach about nine feet tall.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Agmon is an orcish empire lying near Gemore.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orcs are among the most common nonhumans on the streets of Keihona.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In Helmaris orcs and humans live mixed, with no split by class or neighborhood.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some orcs and humans are hard to tell apart except by the shade of their skin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Some Questors wear orcish bodies, among them Ushia, the greatest seer on Davrar.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Orc corpses rise among the undead that roam blighted lands.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
