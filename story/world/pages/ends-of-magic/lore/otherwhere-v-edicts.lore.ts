import type { Lore } from "akasha/story/lore/lore.page-type.types.ts"

export const otherwhereVEdicts = {
  id: "01a0e9f4-c9f7-76cb-87ef-1e2091c3743b",
  type: "page-type/lore",
  slug: "otherwhere-v-edicts",
  title: "Edicts",
  world: "world/ends-of-magic",
  about: "world-mechanic/otherwhere-v-edicts",
  facts: [
    {
      fact: "An edict is a law imposed on reality with Davrar's help.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edicts are spoken in a reverberating, prayer-like voice.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A broader edict with no exceptions is more powerful and harder to break.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edict: Disintegration bends its beam to find its target and does not stop.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Edict of Fate: Firestorm fills an area with self-sustaining fire.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Antimagic wears edicts down.",
      knowers: ["lore-disclosure/game-master"],
    },
  ],
  secrets: "jsonl",
} as const satisfies Lore
