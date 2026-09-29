import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBlueDuke = {
  id: "01a0ea79-96af-7a58-8086-559ad464f483",
  type: "page-type/lore",
  slug: "otherwhere-xi-blue-duke",
  title: "The Blue Duke",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-character/otherwhere-xi-blue-duke",
  facts: [
    {
      fact: "The deposed Blue Duke is a short, swarthy, gray-bearded Enorian lord of the old loyalists.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Blue Duke is heir of the heroes Cadril the Mountain and Hiram of the Thousand Blades.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Blue Duke's title has passed to his nephew, whom many hold the true Blue Duke.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The Blue Duke led Enorian loyalist mercenaries in the Glastian purge, and hates King Sangor.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "No word of the Blue Duke has come from the final war; he is thought to live in Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
