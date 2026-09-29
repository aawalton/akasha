import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereXiAssassinsGuild = {
  id: "01a0ea89-4775-7407-b6bb-1b82c440de23",
  type: "page-type/lore",
  slug: "otherwhere-xi-assassins-guild",
  title: "The Assassins' Guild of Helock",
  world: "world/the-calamitous-bob-stubbed",
  about: "world-organization/otherwhere-xi-assassins-guild",
  facts: [
    {
      fact: "Helock's assassins' guild was based beneath the city's warehouse district.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Assassins of the guild shadow-step by riding black mana to a spot of darkness.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild raided the Five Fishes inn in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The guild took a contract on the exiled prince Sidjin.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Solfis's teams wiped out the guild in a night raid.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The same night a flour warehouse exploded and ethnic riots broke out in Helock.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
} as const satisfies Lore
