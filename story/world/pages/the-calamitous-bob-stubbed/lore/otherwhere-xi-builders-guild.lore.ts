import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiBuildersGuild = {
  id: "01a0ea89-f42c-7d82-92f9-5c2c92e2ae4a",
  type: "page-type/lore",
  slug: "otherwhere-xi-builders-guild",
  title: "The Builders' Guild",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-builders-guild",
  facts: [
    {
      fact: "The builders' guild sponsored Magister Sterek's secret teleport research.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The builders' guild refused to fund a killing of Sidjin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sidjin took over Sterek's contract to build the guild a gate network.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild's gate network runs two-thirds of the way toward Harrak through northern Enoria.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Sidjin agreed to build no other gate networks until the guild's was finished.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
