import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiGuildOfCaravaneers = {
  id: "01a0ea89-f42d-710a-bfa4-cb2bffe279d2",
  type: "page-type/lore",
  slug: "otherwhere-xi-guild-of-caravaneers",
  title: "The Guild of Caravaneers",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-guild-of-caravaneers",
  facts: [
    {
      fact: "The Guild of Caravaneers runs Baran's overland trade caravans.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Harrak's portal network has broken the caravan guilds' trade.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Rebels destroyed two of Harrak's portal arrays as caravan trade collapsed.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
