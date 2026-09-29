import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiDenerim = {
  id: "01a0ea7c-0781-761c-ab30-ad4ec7bee4b5",
  type: "page-type/lore",
  slug: "otherwhere-xi-denerim",
  title: "Denerim",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-denerim",
  facts: [
    {
      fact: "Denerim was an old senior inquisitor of Neriad, sent to Harrak; he once had a wife.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Hallurian deserter Orkan was Denerim's apprentice, and became a full inquisitor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Denerim sought truth in Harrak with his skill of detecting falsehood and seeing shadowed souls.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Denerim sailed with Viv to lift the siege of Sardanal's Cradle.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Struck down at the Cradle, dying Denerim became Neriad's vessel, a golden titan with a sun sword.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Through Denerim, Neriad beheaded Octas's incarnation; only Denerim's armour was left after.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Denerim's voice, as Neriad's avatar, spoke to Viv in the final war and shielded her from Octas.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Denerim is dead in the flesh; his soul serves Neriad as that god's avatar.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
