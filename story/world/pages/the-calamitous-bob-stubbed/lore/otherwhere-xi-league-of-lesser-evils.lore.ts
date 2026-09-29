import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiLeagueOfLesserEvils = {
  id: "01a0ea8a-6437-7125-9b71-18530a968776",
  type: "page-type/lore",
  slug: "otherwhere-xi-league-of-lesser-evils",
  title: "The League of Lesser Evils",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-league-of-lesser-evils",
  facts: [
    {
      fact: "The League of Lesser Evils was Viviane, Sidjin, Abenezigel, Solfis and Irao.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The League waged a vendetta on the Helock archmage Elunath in spring.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The League robbed a bank in Helock during the vendetta.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The League killed Elunath on the third day and freed the mages he held in servitude.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
