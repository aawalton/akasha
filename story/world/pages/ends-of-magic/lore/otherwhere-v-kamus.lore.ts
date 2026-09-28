import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVKamus = {
  id: "01a0e9fc-f50a-7b52-b74a-0c0d5c5a3f1a",
  type: "page-type/lore",
  slug: "otherwhere-v-kamus",
  title: "Kamus",
  world: "world/ends-of-magic",
  about: "world-character/otherwhere-v-kamus",
  facts: [
    {
      fact: "Kamus of the Gold Tower of Kalis is an elderly, bald Questor wizard in white robes.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "His aura Talent controls the aether; he speaks Edicts in a prayer-like voice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Kamus is a completionist who wants every Insight and would break his class to learn more.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "He has died only about a score of times, mostly to gods and dragons.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: 'He swears "on Edes\' rotting corpse."',
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "In this season Kamus is one of the few hundred Questors of the highest tier.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
