import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVSeals = {
  id: "01a0e9fa-d593-792d-9d3b-c192b7bc7c40",
  type: "page-type/lore",
  slug: "otherwhere-v-seals",
  title: "Seals",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-seals",
  facts: [
    {
      fact: "Hundreds of Seals are set across Davrar; from high above they show as black spots.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Seal is interlocking stone slabs around circular, vault-like doors that iris open.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Seal cleanses the mana around it; a corrupted Seal corrupts mana instead.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A corrupted Seal breeds a blight around it, sending out only its corrupt kind of mana.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing a corrupted Seal is a great deed, a major commitment even for Questors.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Clearing a blight means reaching its center and working a rite of wizardry atop its Seal.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A Seal opens on Solstice night; failing to defend a Seal then is how blights start.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Questors claim Seals; a Questor holding a Seal oversees that region's defense.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Fortresses are built around Seals, such as the Seal Fortress of Sangrad.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Gemore's Seal lies inside a mountain at the old city's heart, curled like a breaking wave.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Oaths are sworn on Seals, and such oaths bind.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Seals repair themselves from almost any damage.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
